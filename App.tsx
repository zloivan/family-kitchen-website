
// FIX: Removed '/// <reference types="vite/client" />' as it was causing a "Cannot find type definition file" error.
import React, { useState, useEffect } from 'react';
import { Language, Page, MenuItem, BusinessConfig, MenuCategory } from './types';
import { HomePage } from './HomePage';
import { MenuPage } from './MenuPage';
import { fetchBusinessConfig, fetchCategories, fetchMenuData, fetchTranslations } from './services/googleSheetsService';
import { FALLBACK_BUSINESS_CONFIG, FALLBACK_MENU_ITEMS, FALLBACK_CATEGORIES_LIST, FALLBACK_TRANSLATIONS } from './data/fallbackData';

// Define a type for all fetched data
interface AppData {
  menu: MenuItem[];
  config: BusinessConfig;
  translations: Record<Language, Record<string, string>>;
  categories: MenuCategory[];
}

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('KA');
  const [page, setPage] = useState<Page>('home');
  const [data, setData] = useState<AppData | null>(null);
  const [usingFallback, setUsingFallback] = useState<boolean>(false);

  // Data fetching logic
  useEffect(() => {
    const loadData = async () => {
      try {
        const [{ menu }, categories, config, translations] = await Promise.all([
          fetchMenuData(),
          fetchCategories(),
          fetchBusinessConfig(),
          fetchTranslations()
        ]);

        // Merge category names into the main translations object for consistent text management
        const mergedTranslations = { ...translations };
        categories.forEach(cat => {
          mergedTranslations.KA[cat.key] = cat.nameKa;
          mergedTranslations.EN[cat.key] = cat.nameEn;
          mergedTranslations.RU[cat.key] = cat.nameRu;
        });

        setData({ menu, config, translations: mergedTranslations, categories });
        setUsingFallback(false);
      } catch (err) {
        console.warn("Could not load live data from Google Sheets. Using local fallback data.", err);
        
        // In fallback mode, merge fallback category names into the main fallback translations
        const mergedTranslations = { ...FALLBACK_TRANSLATIONS };
        FALLBACK_CATEGORIES_LIST.forEach(cat => {
            mergedTranslations.KA[cat.key] = cat.nameKa;
            mergedTranslations.EN[cat.key] = cat.nameEn;
            mergedTranslations.RU[cat.key] = cat.nameRu;
        });

        setData({
          menu: FALLBACK_MENU_ITEMS,
          config: FALLBACK_BUSINESS_CONFIG,
          translations: mergedTranslations,
          categories: FALLBACK_CATEGORIES_LIST,
        });
        setUsingFallback(true);
      }
    };
    loadData();
  }, []);

  // Routing logic: handles initial load and browser back/forward buttons
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname;
      // FIX: Use type assertion to access 'import.meta.env' since Vite's client types are not available.
      const base = (import.meta as any).env.BASE_URL || '/';
      // Check if the path, relative to the base, starts with 'menu'
      if (path.startsWith(base) && path.substring(base.length).startsWith('menu')) {
          setPage('menu');
      } else {
          setPage('home');
      }
    };
    handleLocationChange(); // Set page on initial load
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []); // Runs once on mount

  const t = (key: string): string => {
    return data?.translations[lang]?.[key] || key;
  };

  const navigate = (newPage: Page) => {
    const currentPath = window.location.pathname;
    // FIX: Use type assertion to access 'import.meta.env' since Vite's client types are not available.
    const base = (import.meta as any).env.BASE_URL || '/';
    const currentPage = (currentPath.startsWith(base) && currentPath.substring(base.length).startsWith('menu')) ? 'menu' : 'home';

    if (newPage !== currentPage) {
      // Use Vite's base URL to construct the correct path for sub-directories
      const path = newPage === 'menu' ? `${base}menu` : base;
      window.history.pushState({ page: newPage }, '', path);
      setPage(newPage);
    }
    window.scrollTo(0, 0);
  };
  
  // Render loading state
  if (!data) {
    return <div className="flex items-center justify-center h-screen serif text-2xl">Loading Kitchen...</div>;
  }

  return (
    <div className="min-h-screen selection:bg-[#A13C2B] selection:text-white">
      {usingFallback && (
        <div className="bg-yellow-400 text-center p-2 text-sm text-black shadow-md" role="alert">
          <strong>Notice:</strong> Could not load live content. Displaying locally cached data. Please configure Google Sheets URLs.
        </div>
      )}
      
      {page === 'home' && (
        <HomePage 
          setPage={navigate} 
          lang={lang} 
          setLang={setLang} 
          t={t} 
          config={data.config}
          menuItems={data.menu}
        />
      )}
      {page === 'menu' && (
        <MenuPage 
          setPage={navigate} 
          lang={lang} 
          setLang={setLang} 
          t={t} 
          menuItems={data.menu} 
          categories={data.categories}
          config={data.config}
        />
      )}
    </div>
  );
};

export default App;
