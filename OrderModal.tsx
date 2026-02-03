
import React, { useEffect, useMemo } from 'react';
import { BusinessConfig, Language, MenuItem } from './types';

type OrderModalProps = {
  item: MenuItem;
  onClose: () => void;
  lang: Language;
  t: (key: string) => string;
  config: BusinessConfig;
};

const FALLBACK_MODAL_IMAGE_URL = 'https://images.unsplash.com/photo-1565895405138-6c3a1555da6a?q=80&w=1800&auto=format&fit=crop';

type DeliveryService = {
  key: 'glovo' | 'wolt' | 'bolt';
  name: string;
  style: {
    bg: string;
    text: string;
    border: string;
  };
};

const deliveryServices: DeliveryService[] = [
  { key: 'glovo', name: 'Glovo', style: { bg: 'hover:bg-yellow-400', text: 'text-yellow-500', border: 'border-yellow-400' } },
  { key: 'wolt', name: 'Wolt', style: { bg: 'hover:bg-blue-500', text: 'text-blue-600', border: 'border-blue-500' } },
  { key: 'bolt', name: 'Bolt', style: { bg: 'hover:bg-green-500', text: 'text-green-500', border: 'border-green-400' } }
];

export const OrderModal: React.FC<OrderModalProps> = ({ item, onClose, lang, t, config }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  const availableServices = useMemo(() => {
    return deliveryServices.map(service => {
      const itemSpecificLink = item[`${service.key}Link` as keyof MenuItem] as string | undefined;
      const generalLink = config.deliveryLinks[service.key];
      const url = itemSpecificLink || generalLink;
      return { ...service, url };
    }).filter(service => service.url);
  }, [item, config]);

  const itemName = lang === 'KA' ? item.nameKa : lang === 'EN' ? item.nameEn : item.nameRu;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in" 
      onClick={onClose} 
      role="dialog"
      aria-modal="true"
      aria-labelledby="order-modal-title"
    >
      <div 
        className="bg-white rounded-lg shadow-2xl w-full max-w-md m-auto overflow-hidden animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <img 
            src={item.imageUrl || FALLBACK_MODAL_IMAGE_URL} 
            alt={itemName}
            className="w-full h-56 object-cover"
          />
          <button 
            onClick={onClose}
            className="absolute top-3 right-3 bg-black/30 text-white rounded-full p-2 hover:bg-black/50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label={t('closeButton')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        <div className="p-8 text-center">
          <h3 id="order-modal-title" className="serif text-3xl mb-1 text-[var(--text-dark)]">{itemName}</h3>
          <p className="text-xl font-semibold text-[var(--accent-primary)] mb-6">₾{item.price.toFixed(2)}</p>

          <p className="text-sm font-semibold tracking-widest uppercase text-black/40 mb-4">{t('chooseDeliveryService')}</p>
          
          <div className="space-y-3">
            {availableServices.length > 0 ? (
              availableServices.map(service => (
                <a 
                  key={service.key}
                  href={service.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full flex items-center justify-center p-4 text-sm font-bold border-2 rounded-lg transition-all ${service.style.border} ${service.style.text} ${service.style.bg} hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2`}
                >
                  {t('orderOn')} {service.name}
                </a>
              ))
            ) : (
              <p className="text-sm text-black/50 py-4">{t('deliveryNotAvailable')}</p> 
            )}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up {
          from { transform: translateY(20px); opacity: 0.8; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-fade-in { animation: fade-in 0.2s ease-out forwards; }
        .animate-slide-up { animation: slide-up 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
};
