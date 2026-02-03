
import React, { useMemo } from 'react';
import { BusinessConfig, Language, MenuItem, Page } from './types';

// FIX: Define HomePageProps type to resolve the "Cannot find name 'HomePageProps'" error.
type HomePageProps = {
  setPage: (page: Page, category?: string) => void;
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
  config: BusinessConfig;
  menuItems: MenuItem[];
  onItemSelect: (item: MenuItem) => void;
};

// Social Icons Component for cleaner rendering
const SocialIcons: React.FC<{ config: BusinessConfig; className?: string }> = ({ config, className = '' }) => (
  <div className={`flex items-center gap-6 ${className}`}>
    {config.socials.instagram && (
      <a href={config.socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:opacity-70 transition-opacity">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
      </a>
    )}
    {config.socials.whatsapp && (
      <a href={config.socials.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="hover:opacity-70 transition-opacity">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="currentColor" stroke="none"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.886-.001 2.269.655 4.398 1.908 6.161l.119.198-1.015 3.698 3.797-1.045.166.096z"></path></svg>
      </a>
    )}
    {config.socials.facebook && (
      <a href={config.socials.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:opacity-70 transition-opacity">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="currentColor" stroke="none"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path></svg>
      </a>
    )}
  </div>
);


const LanguageToggle: React.FC<{ current: Language; onToggle: (lang: Language) => void; isScrolled: boolean; }> = ({ current, onToggle, isScrolled }) => {
  const containerClasses = isScrolled 
    ? "bg-black/5 backdrop-blur-md border border-black/10"
    : "bg-white/50 backdrop-blur-sm border border-white/20";

  const buttonThemeClasses = (isActive: boolean) => {
    if (isActive) return 'bg-white text-[var(--text-dark)] shadow';
    return isScrolled
      ? 'text-black/70 hover:bg-white/70'
      : 'text-white/80 hover:bg-white/20';
  };

  return (
    <div className={`flex p-1 rounded-full transition-all duration-300 ${containerClasses}`}>
      {(['KA', 'EN', 'RU'] as Language[]).map(l => (
        <button 
          key={l}
          onClick={() => onToggle(l)}
          className={`text-[10px] font-bold tracking-widest px-3 py-1.5 transition-all rounded-full ${buttonThemeClasses(current === l)}`}
        >
          {l}
        </button>
      ))}
    </div>
  );
};

const Navbar: React.FC<{ setPage: (page: Page) => void; lang: Language; setLang: (lang: Language) => void; t: (key: string) => string; isScrolled: boolean; }> = ({ setPage, lang, setLang, t, isScrolled }) => (
  <header className="fixed top-0 left-0 w-full z-50 p-6">
    <div className="max-w-7xl mx-auto flex justify-between items-center">
      <a href="/" onClick={(e) => { e.preventDefault(); setPage('home'); }} className={`serif text-2xl md:text-3xl font-bold tracking-tight drop-shadow-md transition-colors duration-300 ${isScrolled ? 'text-[var(--text-dark)]' : 'text-white'}`}>
        {t('heroTitle')}
      </a>
      <div className="flex items-center gap-8">
        <LanguageToggle current={lang} onToggle={setLang} isScrolled={isScrolled} />
      </div>
    </div>
  </header>
);

const SpecialOffers: React.FC<{ 
  items: MenuItem[]; 
  lang: Language; 
  t: (key: string) => string; 
  onNavigateToMenu: (category?: string) => void;
  onItemSelect: (item: MenuItem) => void;
}> = ({ items, lang, t, onNavigateToMenu, onItemSelect }) => {
  const FALLBACK_IMAGE_URL = 'https://images.unsplash.com/photo-1565895405138-6c3a1555da6a?q=80&w=1800&auto=format&fit=crop';

  return (
    <section className="py-24 md:py-32 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center">
          <h2 className="text-5xl md:text-7xl serif mb-12">{t('specialOffersTitle')}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map(item => (
            <button
              key={item.id}
              onClick={() => onItemSelect(item)}
              className="bg-stone-50 border border-stone-200 rounded-lg shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2"
              aria-label={`View details for ${item.nameEn}`}
            >
              <div className="flex-grow"> {/* Content wrapper */}
                <img 
                  src={item.imageUrl || FALLBACK_IMAGE_URL} 
                  alt={lang === 'KA' ? item.nameKa : lang === 'EN' ? item.nameEn : item.nameRu}
                  className="w-full h-56 object-cover"
                  loading="lazy"
                />
                <div className="p-6">
                  <div className="flex justify-between items-baseline mb-3">
                    <h4 className="text-xl font-semibold tracking-tight flex items-center gap-3">
                      {lang === 'KA' ? item.nameKa : lang === 'EN' ? item.nameEn : item.nameRu}
                      <span className="text-yellow-500">★</span>
                    </h4>
                    <div className="flex-grow border-b border-dashed border-stone-200 mx-4"></div>
                    <span className="text-base font-semibold text-black/80">₾{item.price.toFixed(2)}</span>
                  </div>
                  <p className="text-sm text-black/50 pr-4">
                    {lang === 'KA' ? item.descriptionKa : lang === 'EN' ? item.descriptionEn : item.descriptionRu}
                  </p>
                </div>
              </div>
              <div className="px-6 pb-6 pt-2"> {/* Fake button wrapper */}
                <div className="w-full bg-[var(--accent-primary)] text-white text-center px-4 py-3 text-xs font-bold tracking-widest uppercase transition-colors group-hover:bg-red-800 rounded-md shadow">
                  {t('orderNowButton')}
                </div>
              </div>
            </button>
          ))}
        </div>
        <div className="text-center mt-16">
          <button 
            onClick={() => onNavigateToMenu()} 
            className="bg-[var(--text-dark)] text-white px-12 py-5 text-[11px] font-bold tracking-[0.2em] uppercase transition-all hover:opacity-80 active:scale-95 shadow-lg"
          >
            {t('viewFullMenuButton')}
          </button>
        </div>
      </div>
    </section>
  );
};


export const HomePage: React.FC<HomePageProps> = ({ setPage, lang, setLang, t, config, menuItems, onItemSelect }) => {
  const [isScrolled, setIsScrolled] = React.useState(false);
  
  const specialItems = useMemo(() => menuItems.filter(item => item.isSpecial), [menuItems]);

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Navbar setPage={setPage} lang={lang} setLang={setLang} t={t} isScrolled={isScrolled} />
      <main>
        {/* Hero Section */}
        <section className="relative h-screen bg-black/40 text-white flex flex-col items-center justify-center text-center px-6">
          <div className="absolute inset-0 z-[-1]">
             <img src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=3000&auto-format&fit=crop" alt="Delicious food preparation" className="w-full h-full object-cover"/>
          </div>
          <div className="z-10 fade-in-up">
            <h1 className="text-6xl md:text-8xl lg:text-[10rem] serif mb-4 leading-[0.9] tracking-tight drop-shadow-xl">{t('heroTitle')}</h1>
            <p className="text-lg md:text-2xl font-light tracking-widest opacity-90 drop-shadow-lg">{t('heroSubtitle')}</p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center mt-12">
              <button onClick={() => setPage('menu')} className="w-full sm:w-auto bg-[var(--accent-primary)] text-white px-12 py-5 text-[11px] font-bold tracking-[0.2em] uppercase transition-all hover:bg-red-800 active:scale-95 shadow-lg">
                {t('menuButton')}
              </button>
              <a href="#location" className="w-full sm:w-auto border-2 border-white px-12 py-5 text-[11px] font-bold tracking-[0.2em] uppercase transition-all backdrop-blur-sm hover:bg-white/10 active:scale-95">
                {t('contact')}
              </a>
            </div>
          </div>
        </section>
        
        {/* Special Offers Section - Conditionally Rendered */}
        {specialItems.length > 0 && (
          <SpecialOffers 
             items={specialItems} 
             lang={lang} 
             t={t} 
             onNavigateToMenu={(category) => setPage('menu', category)}
             onItemSelect={onItemSelect}
          />
        )}

        {/* Location Section */}
        <section id="location" className="py-24 md:py-40 px-6">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2 w-full">
              <h2 className="text-5xl md:text-7xl serif mb-12">{t('contact')}</h2>
              <div className="space-y-8 text-lg">
                <div>
                  <h3 className="font-bold tracking-widest text-sm uppercase text-black/40 mb-2">{t('address')}</h3>
                  <p>{lang === 'KA' ? config.addressKa : lang === 'EN' ? config.addressEn : config.addressRu}</p>
                </div>
                <div>
                  <h3 className="font-bold tracking-widest text-sm uppercase text-black/40 mb-2">{t('hours')}</h3>
                  <p>{config.hours.open} – {config.hours.close}</p>
                </div>
                <div>
                  <h3 className="font-bold tracking-widest text-sm uppercase text-black/40 mb-2">{t('phoneLabel')}</h3>
                  <a href={`tel:${config.phone}`} className="hover:opacity-70 transition-opacity">{config.phone}</a>
                </div>
                <div>
                  <h3 className="font-bold tracking-widest text-sm uppercase text-black/40 mb-2">{t('socials')}</h3>
                  <SocialIcons config={config} className="text-[var(--text-dark)]" />
                </div>
              </div>
               <a href="https://maps.app.goo.gl/ea6cEkJQmwYCJehu5" target="_blank" rel="noopener" className="inline-block mt-12 text-[12px] font-bold tracking-[0.2em] uppercase bg-[var(--text-dark)] text-white px-8 py-4 hover:opacity-80 transition-opacity">
                 {t('openInMaps')}
               </a>
            </div>
            <div className="lg:w-1/2 w-full h-96 lg:h-[500px] rounded-lg overflow-hidden shadow-2xl">
              <iframe 
                title="Google Maps"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d744.3446073445333!2d44.7843108!3d41.7339297!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!_x404472c0f8d62045%3A0x481a3b172fed7cf!2z0KHQtdC80LXQudC90LDRjyDQutGD0YXQvdGP!5e0!3m2!1sru!2sge!4v1770134000810!5m2!1sru!2sge"
                className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-500"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-[var(--text-dark)] text-white/70 py-16 px-6 text-center">
        <SocialIcons config={config} className="text-white/70 justify-center mb-8" />
        <p className="text-xs tracking-widest">
          &copy; {new Date().getFullYear()} {t('heroTitle')}.
        </p>
      </footer>
    </>
  );
};
