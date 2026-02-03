
import { BusinessConfig, MenuItem, Language, MenuCategory } from '../types';

export const FALLBACK_BUSINESS_CONFIG: BusinessConfig = {
  addressKa: "თბილისი, აკაკი წერეთლის პროსპექტი, 67",
  addressEn: "Tbilisi, Akaki Tsereteli Avenue, 67",
  addressRu: "Тбилиси, проспект Акакия Церетели, 67",
  phone: "+995551515511",
  hours: {
    open: "09:00",
    close: "22:00"
  },
  deliveryLinks: {
    glovo: "https://glovoapp.com/ge/en/tbilisi/saojakho-samzareulo-tbi/",
    wolt: "",
    bolt: ""
  },
  socials: {
    instagram: "https://instagram.com",
    whatsapp: "https://wa.me/995551515511",
    facebook: "https://facebook.com"
  }
};

export const FALLBACK_MENU_ITEMS: MenuItem[] = [
  {
    id: 'khachapuri_megrelian', nameKa: "მეგრული ხაჭაპური", nameEn: "Megrelian Khachapuri", nameRu: "Мегрельский хачапури", price: 18,
    descriptionKa: "სახლური ყველით", descriptionEn: "With homemade cheese", descriptionRu: "С домашним сыром", category: "Main", isSpecial: true
  },
  {
    id: 'khinkali_meat', nameKa: "ხინკალი ხორცით", nameEn: "Khinkali (Meat)", nameRu: "Хинкали с мясом", price: 12,
    descriptionKa: "5 ცალი", descriptionEn: "5 pieces", descriptionRu: "5 штук", category: "Dumplings"
  },
  {
    id: 'khinkali_cheese', nameKa: "ხინკალი ყველით", nameEn: "Khinkali (Cheese)", nameRu: "Хинкали с сыром", price: 13,
    descriptionKa: "5 ცალი", descriptionEn: "5 pieces", descriptionRu: "5 штук", category: "Dumplings"
  },
  {
    id: 'lobio', nameKa: "ლობიო", nameEn: "Lobio", nameRu: "Лобио", price: 9,
    descriptionKa: "ტრადიციული", descriptionEn: "Traditional", descriptionRu: "Традиционное", category: "Soups", isSpecial: true
  }
];

export const FALLBACK_CATEGORIES_LIST: MenuCategory[] = [
  { key: 'Soups', sortOrder: 1, nameKa: 'წვნიანები', nameEn: 'Soups', nameRu: 'Супы' },
  { key: 'Main', sortOrder: 2, nameKa: 'მთავარი', nameEn: 'Main', nameRu: 'Основное' },
  { key: 'Dumplings', sortOrder: 3, nameKa: 'ხინკალი', nameEn: 'Dumplings', nameRu: 'Хинкали' },
];

export const FALLBACK_TRANSLATIONS: Record<Language, Record<string, string>> = {
  KA: {
    heroTitle: "საოჯახო სამზარეულო",
    heroSubtitle: "სახლური გემოები",
    menuButton: "მენიუ",
    backButton: "უკან",
    workingHours: "სამუშაო საათები",
    deliveryTitle: "მიტანა",
    address: "მისამართი",
    hours: "სამუშაო საათები",
    contact: "კონტაქტი",
    openInMaps: "გახსენი რუკაზე",
    all: "ყველა",
    phoneLabel: "ტელეფონი",
    socials: "სოციალური ქსელები",
    specialOffersTitle: "განსაკუთრებული შეთავაზებები"
  },
  EN: {
    heroTitle: "Family Kitchen",
    heroSubtitle: "Taste of Home",
    menuButton: "Menu",
    backButton: "Back",
    workingHours: "Working Hours",
    deliveryTitle: "Delivery",
    address: "Address",
    hours: "Opening Hours",
    contact: "Contact",
    openInMaps: "Open in Maps",
    all: "All",
    phoneLabel: "Phone",
    socials: "Socials",
    specialOffersTitle: "Special Offers"
  },
  RU: {
    heroTitle: "Семейная кухня",
    heroSubtitle: "Домашний вкус",
    menuButton: "Меню",
    backButton: "Назад",
    workingHours: "Часы работы",
    deliveryTitle: "Доставка",
    address: "Адрес",
    hours: "Часы работы",
    contact: "Контакт",
    openInMaps: "Открыть на карте",
    all: "Все",
    phoneLabel: "Телефон",
    socials: "Социальные сети",
    specialOffersTitle: "Специальные предложения"
  }
};
