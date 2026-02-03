import React from 'react';
import { BusinessConfig, Language, MenuItem, Page } from './types';

type HomePageProps = {
  setPage: (page: Page) => void;
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
  menuItems: MenuItem[];
  config: BusinessConfig;
};

const LanguageToggle: React.FC<{ current: Language; onToggle: (lang: Language) => void; }> = ({ current, onToggle }) => (
  <div className="flex bg-white/50 backdrop-blur-sm p-1 rounded-full border border-white/20">
    {(['KA', 'EN', 'RU'] as Language[]).map(l => (
      <button 
        key={l}
        onClick={() => onToggle(l)}
        className={`text-[10px] font-bold tracking-widest px-3 py-1.5 transition-all rounded-full ${current === l ? 'bg-white text-[var(--text-dark)] shadow' : 'text-white/80 hover:bg-white/20'}`}
      >
        {l}
      </button>
    ))}
  </div>
);

const Navbar: React.FC<{ setPage: (page: Page) => void; lang: Language; setLang: (lang: Language) => void; t: (key: string) => string; }> = ({ setPage, lang, setLang, t }) => (
  <header className="fixed top-0 left-0 w-full z-50 p-6">
    <div className="max-w-7xl mx-auto flex justify-between items-center">
      <a href="/" onClick={(e) => { e.preventDefault(); setPage('home'); }} className="serif text-2xl md:text-3xl font-bold text-white tracking-tight drop-shadow-md">
        {t('heroTitle')}
      </a>
      <div className="flex items-center gap-8">
        <LanguageToggle current={lang} onToggle={setLang} />
      </div>
    </div>
  </header>
);

export const HomePage: React.FC<HomePageProps> = ({ setPage, lang, setLang, t, menuItems, config }) => {
  return (
    <>
      <Navbar setPage={setPage} lang={lang} setLang={setLang} t={t} />
      <main>
        {/* Hero Section */}
        <section className="relative h-screen bg-black/40 text-white flex flex-col items-center justify-center text-center px-6">
          <div className="absolute inset-0 z-[-1]">
             <img src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=3000&auto=format&fit=crop" alt="Delicious food preparation" className="w-full h-full object-cover"/>
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
              </div>
               <a href="https://maps.app.goo.gl/ea6cEkJQmwYCJehu5" target="_blank" rel="noopener" className="inline-block mt-12 text-[12px] font-bold tracking-[0.2em] uppercase bg-[var(--text-dark)] text-white px-8 py-4 hover:opacity-80 transition-opacity">
                 {t('openInMaps')}
               </a>
            </div>
            <div className="lg:w-1/2 w-full h-96 lg:h-[500px] rounded-lg overflow-hidden shadow-2xl">
              <iframe 
                title="Google Maps"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2978.140884587424!2d44.77271737671375!3d41.71746407127627!2m3!1f0!2f0!3f0!3m2!1i1024!i768!4f13.1!3m3!1m2!1s0x404472d4ecf55555%3A0x6734c562e841804b!2s15%20Pekini%20Ave%2C%20Tbilisi%200160!5e0!3m2!1sen!2sge!4v1719500000000!5m2!1sen!2sge"
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
        <p className="text-xs tracking-widest">
          &copy; {new Date().getFullYear()} {t('heroTitle')}.
        </p>
      </footer>
    </>
  );
};