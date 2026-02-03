
import { BusinessConfig } from '../types';

export const BUSINESS_CONFIG: BusinessConfig = {
  addressKa: "თბილისი, პეკინის გამზირი 15",
  addressEn: "15 Pekini Ave, Tbilisi",
  addressRu: "Тбилиси, проспект Пекина 15",
  phone: "+995 551 51 55 11",
  hours: {
    open: "09:00",
    close: "22:00"
  },
  // FIX: Add wolt and bolt delivery links.
  deliveryLinks: {
    glovo: "https://glovoapp.com/ge/en/tbilisi/saojakho-samzareulo-tbi/",
    wolt: "https://wolt.com/ka/geo/tbilisi/restaurant/saojakho-samzareulo",
    bolt: "https://food.bolt.eu/ka-GE/tbilisi/551-saojakho-samzareulo"
  },
  socials: {
    instagram: "https://instagram.com",
    whatsapp: "https://wa.me/995551515511"
  }
};
