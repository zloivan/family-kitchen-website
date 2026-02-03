
import React, { useState } from 'react';
import { BusinessConfig, Language, MenuItem, Page } from './types';

type MenuPageProps = {
  setPage: (page: Page) => void;
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
  menuItems: MenuItem[];
  config: BusinessConfig;
};

const LanguageToggle: React.FC<{ current: Language; onToggle: (lang: Language) => void; }> = ({ current, onToggle }) => (
  <div className="flex bg-white p-1 rounded-full border border-stone-200">
    {(['KA', 'EN', 'RU'] as Language[]).map(l => (
      <button 
        key={l}
        onClick={() => onToggle(l)}
        className={`text-[10px] font-bold tracking-widest px-3 py-1.5 transition-all rounded-full ${current === l ? 'bg-[var(--text-dark)] text-white shadow' : 'text-black/60 hover:bg-stone-100'}`}
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

export const MenuPage: React.FC<MenuPageProps> = ({ setPage, lang, setLang, t, menuItems, config }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  // Derive unique, sorted category keys directly from the menu items
  const categoryKeys = Array.from(new Set(menuItems.map(item => item.category))).sort();

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
          {/* Sticky Category Nav */}
          <aside className="md:w-1/4 lg:w-1/5 md:sticky top-28 self-start">
            <nav className="flex flex-row md:flex-col gap-2 md:gap-3 flex-wrap">
              <button 
                onClick={() => setActiveCategory('all')}
                className={`w-full text-left text-sm font-semibold p-3 rounded-md transition-colors ${activeCategory === 'all' ? 'bg-[var(--text-dark)] text-white' : 'hover:bg-stone-200'}`}
              >
                {t('all')}
              </button>
              {categoryKeys.map(catKey => (
                <button 
                  key={catKey}
                  onClick={() => setActiveCategory(catKey)}
                  className={`w-full text-left text-sm font-semibold p-3 rounded-md transition-colors ${activeCategory === catKey ? 'bg-[var(--text-dark)] text-white' : 'hover:bg-stone-200'}`}
                >
                  {t(catKey)}
                </button>
              ))}
            </nav>
          </aside>

          {/* Menu Items */}
          <main className="w-full md:w-3/4 lg:w-4/5">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-10">
              {filteredItems.map(item => (
                <div key={item.id} className="group">
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
              ))}
            </div>
          </main>
        </div>
      </div>
       <footer className="bg-stone-100 mt-20 py-16 px-6 text-center">
         <h3 className="serif text-3xl mb-4">{t('deliveryTitle')}</h3>
         <div className="flex flex-wrap justify-center gap-8 mt-8">
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
      </footer>
    </>
  );
};