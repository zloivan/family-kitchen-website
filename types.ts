
export type Language = 'KA' | 'EN' | 'RU';

export type Page = 'home' | 'menu';

export interface MenuItem {
  id: string;
  nameKa: string;
  nameEn: string;
  nameRu: string;
  price: number;
  descriptionKa?: string;
  descriptionEn?: string;
  descriptionRu?: string;
  category: string;
  isSpecial?: boolean;
  imageUrl?: string;
}

export interface MenuCategory {
  key: string;
  sortOrder: number;
  nameKa: string;
  nameEn: string;
  nameRu: string;
}

export interface BusinessConfig {
  addressKa: string;
  addressEn: string;
  addressRu: string;
  phone: string;
  hours: {
    open: string;
    close: string;
  };
  deliveryLinks: {
    glovo?: string;
    // FIX: Add optional wolt and bolt properties to support more delivery services.
    wolt?: string;
    bolt?: string;
  };
  socials: {
    instagram?: string;
    whatsapp?: string;
    facebook?: string;
  };
}
