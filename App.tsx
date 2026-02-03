
import React, { useState, useEffect } from 'react';
import { Language, Page, MenuItem, BusinessConfig } from './types';
import { HomePage } from './HomePage';
import { MenuPage } from './MenuPage';
import { fetchBusinessConfig, fetchMenuData, fetchTranslations } from './services/googleSheetsService';
import { FALLBACK_BUSINESS_CONFIG, FALLBACK_MENU_ITEMS, FALLBACK_CATEGORIES, FALLBACK_TRANSLATIONS } from './data/fallbackData';

// Define a type for all fetched data
interface AppData {
  menu: MenuItem[];
  categories: any;
  config: BusinessConfig;
  translations: Record<Language, Record<string, string>>;
}

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('KA');
  const [page, setPage] = useState<Page>('home');
  const [data, setData] = useState<AppData | null>(null);
  const [usingFallback, setUsingFallback] = useState<boolean>(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Attempt to fetch live data from Google Sheets
        const [{ menu, categories }, config, translations] = await Promise.all([
          fetchMenuData(),
          fetchBusinessConfig(),
          fetchTranslations()
        ]);
        setData({ menu, categories, config, translations });
        setUsingFallback(false);
      } catch (err) {
        // If fetching fails, log a warning and use local fallback data
        console.warn("Could not load live data from Google Sheets. Using local fallback data.", err);
        setData({
          menu: FALLBACK_MENU_ITEMS,
          categories: FALLBACK_CATEGORIES,
          config: FALLBACK_BUSINESS_CONFIG,
          translations: FALLBACK_TRANSLATIONS,
        });
        setUsingFallback(true);
      }
    };
    loadData();
  }, []);

  const t = (key: string): string => {
    return data?.translations[lang]?.[key] || key;
  };

  const navigate = (newPage: Page) => {
    const path = newPage === 'menu' ? '/menu' : '/';
    window.history.pushState({}, '', path);
    setPage(newPage);
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
          menuItems={data.menu} 
          config={data.config} 
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
