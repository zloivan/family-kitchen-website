
import React, { useState, useMemo, useEffect } from 'react';
import { BusinessConfig, Language, MenuCategory, MenuItem, Page } from './types';

type MenuPageProps = {
  setPage: (page: Page, category?: string) => void;
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
  menuItems: MenuItem[];
  categories: MenuCategory[];
  config: BusinessConfig;
  targetCategory: string | null;
  setTargetCategory: (category: string | null) => void;
  onItemSelect: (item: MenuItem) => void;
};

// Social Icons Component for the Menu Page Footer
const FooterSocialIcons: React.FC<{ config: BusinessConfig; className?: string }> = ({ config, className = '' }) => (
  <div className={`flex items-center justify-center gap-6 ${className}`}>
    {config.socials.instagram && (
      <a href={config.socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:opacity-70 transition-opacity">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
      </a>
    )}
    {config.socials.whatsapp && (
      <a href={config.socials.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="hover:opacity-70 transition-opacity">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.886-.001 2.269.655 4.398 1.908 6.161l.119.198-1.015 3.698 3.797-1.045.166.096z"></path></svg>
      </a>
    )}
    {config.socials.facebook && (
      <a href={config.socials.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:opacity-70 transition-opacity">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path></svg>
      </a>
    )}
  </div>
);

const LanguageToggle: React.FC<{ current: Language; onToggle: (lang: Language) => void; }> = ({ current, onToggle }) => (
  <div className="flex bg-black/5 backdrop-blur-md p-1 rounded-full border border-black/10">
    {(['KA', 'EN', 'RU'] as Language[]).map(l => (
      <button 
        key={l}
        onClick={() => onToggle(l)}
        className={`text-[10px] font-bold tracking-widest px-3 py-1.5 transition-all rounded-full ${current === l ? 'bg-white text-[var(--text-dark)] shadow' : 'text-black/70 hover:bg-white/70'}`}
      >
        {l}
      </button>
    ))}
  </div>
);

const MenuNavbar: React.FC<{ setPage: (page: Page) => void; lang: Language; setLang: (lang: Language) => void; t: (key: string) => string; }> = ({ setPage, lang, setLang, t }) => (
  <header className="sticky top-0 left-0 w-full z-30 p-4 md:p-6 bg-white/80 backdrop-blur-lg border-b border-stone-200">
    <div className="max-w-7xl mx-auto flex justify-between items-center">
      <button onClick={() => setPage('home')} className="serif text-xl md:text-2xl font-bold tracking-tight hover:opacity-70 transition-opacity">
        ← {t('backButton')}
      </button>
      <div className="flex items-center gap-8">
        <LanguageToggle current={lang} onToggle={setLang} />
      </div>
    </div>
  </header>
);

export const MenuPage: React.FC<MenuPageProps> = ({ setPage, lang, setLang, t, menuItems, categories, config, targetCategory, setTargetCategory, onItemSelect }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  useEffect(() => {
    if (targetCategory) {
      setActiveCategory(targetCategory);
      // Consume the target category so it doesn't re-trigger on subsequent renders
      setTargetCategory(null);
    }
  }, [targetCategory, setTargetCategory]);
  
  const sortedCategories = useMemo(() => {
    // If categories are provided, sort them by the specified order.
    if (categories && categories.length > 0) {
      return [...categories].sort((a, b) => a.sortOrder - b.sortOrder);
    }
    // Fallback: if no categories are managed in the sheet, derive from menu items and sort alphabetically.
    const derivedKeys = Array.from(new Set(menuItems.map(item => item.category))).sort();
    return derivedKeys.map((key, index) => ({
      key,
      sortOrder: index + 1,
      nameKa: key,
      nameEn: key,
      nameRu: key,
    }));
  }, [categories, menuItems]);

  const filteredItems = activeCategory === 'all'
    ? menuItems
    : menuItems.filter(item => item.category === activeCategory);

  return (
    <>
      <MenuNavbar setPage={setPage} lang={lang} setLang={setLang} t={t} />
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
        <div className="text-center mb-12 md:mb-20">
          <h1 className="text-5xl md:text-7xl serif mb-4">{t('menuButton')}</h1>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8 lg:gap-16">
          <aside className="md:w-1/4 lg:w-1/5 md:sticky top-28 self-start">
            <nav className="flex flex-row md:flex-col gap-2 md:gap-3 flex-wrap">
              <button 
                onClick={() => setActiveCategory('all')}
                className={`w-full text-left text-sm font-semibold p-3 rounded-md transition-colors ${activeCategory === 'all' ? 'bg-[var(--text-dark)] text-white' : 'hover:bg-stone-200'}`}
              >
                {t('all')}
              </button>
              {sortedCategories.map(cat => (
                <button 
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`w-full text-left text-sm font-semibold p-3 rounded-md transition-colors ${activeCategory === cat.key ? 'bg-[var(--text-dark)] text-white' : 'hover:bg-stone-200'}`}
                >
                  {t(cat.key)}
                </button>
              ))}
            </nav>
          </aside>

          <main className="w-full md:w-3/4 lg:w-4/5">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-10">
              {filteredItems.map(item => {
                const hasDeliveryOptions = !!((item.glovoLink || item.woltLink || item.boltLink) || (config.deliveryLinks.glovo || config.deliveryLinks.wolt || config.deliveryLinks.bolt));
                const buttonText = t(hasDeliveryOptions ? 'orderButton' : 'viewButton');
                const buttonStyle = hasDeliveryOptions
                  ? 'bg-[var(--accent-primary)] text-white group-hover:bg-red-800'
                  : 'bg-stone-200 text-[var(--text-dark)] group-hover:bg-stone-300';
                
                return (
                  <button 
                    key={item.id} 
                    className="group text-left p-4 rounded-lg hover:bg-stone-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] transition-colors flex flex-col justify-between"
                    onClick={() => onItemSelect(item)}
                    aria-label={`${buttonText} ${item.nameEn}`}
                  >
                    <div>
                      <div className="flex justify-between items-baseline mb-2">
                        <h4 className="text-xl font-semibold tracking-tight flex items-center gap-3">
                          {lang === 'KA' ? item.nameKa : lang === 'EN' ? item.nameEn : item.nameRu}
                          {item.isSpecial && <span className="text-yellow-500">★</span>}
                        </h4>
                        <div className="flex-grow border-b border-dashed border-stone-200 mx-4"></div>
                        <span className="text-base font-semibold text-black/80">₾{item.price.toFixed(2)}</span>
                      </div>
                      <p className="text-sm text-black/50 pr-4">
                        {lang === 'KA' ? item.descriptionKa : lang === 'EN' ? item.descriptionEn : item.descriptionRu}
                      </p>
                    </div>
                    <div className="mt-4 self-start">
                      <div className={`inline-block text-xs font-bold tracking-widest uppercase px-5 py-2.5 rounded-md shadow-sm transition-colors ${buttonStyle}`}>
                          {buttonText}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </main>
        </div>
      </div>
       <footer className="bg-stone-100 mt-20 py-16 px-6 text-center text-stone-600">
         <h3 className="serif text-3xl mb-4 text-[var(--text-dark)]">{t('deliveryTitle')}</h3>
         <div className="flex flex-wrap justify-center gap-8 my-8">
           {config.deliveryLinks.glovo && (
            <a href={config.deliveryLinks.glovo} target="_blank" rel="noopener" className="font-bold text-yellow-500 border-b-2 border-yellow-200 hover:border-yellow-500 transition-colors pb-1">
             Glovo
            </a>
           )}
           {config.deliveryLinks.wolt && (
            <a href={config.deliveryLinks.wolt} target="_blank" rel="noopener" className="font-bold text-blue-600 border-b-2 border-blue-200 hover:border-blue-600 transition-colors pb-1">
             Wolt
            </a>
           )}
           {config.deliveryLinks.bolt && (
            <a href={config.deliveryLinks.bolt} target="_blank" rel="noopener" className="font-bold text-green-500 border-b-2 border-green-200 hover:border-green-500 transition-colors pb-1">
             Bolt
            </a>
           )}
         </div>
         <FooterSocialIcons config={config} className="text-stone-500 my-8" />
         <p className="text-xs tracking-widest text-stone-400">
          &copy; {new Date().getFullYear()} {t('heroTitle')}.
        </p>
      </footer>
    </>
  );
};