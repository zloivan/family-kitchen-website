
import { GOOGLE_SHEET_URLS } from '../googleSheetConfig';
import { BusinessConfig, Language, MenuItem } from '../types';

// --- Data Parsers ---

/**
 * Parses a TSV string into an array of objects.
 * Assumes the first row is the header.
 */
function tsvToObjects<T>(tsv: string): T[] {
  const [headerLine, ...lines] = tsv.trim().split('\n');
  const headers = headerLine.split('\t').map(h => h.trim());
  
  return lines.map(line => {
    const values = line.split('\t').map(v => v.trim());
    return headers.reduce((obj, header, index) => {
      const value = values[index];
      // Convert 'TRUE'/'FALSE' strings to booleans, numbers to numbers
      let parsedValue: any = value;
      if (value === 'TRUE') parsedValue = true;
      else if (value === 'FALSE') parsedValue = false;
      else if (!isNaN(Number(value)) && value !== '') parsedValue = Number(value);
      
      obj[header as keyof T] = parsedValue;
      return obj;
    }, {} as T);
  });
}

/**
 * Parses a two-column key-value TSV into a single object.
 */
function tsvToKeyValue(tsv: string): Record<string, string> {
  const lines = tsv.trim().split('\n');
  lines.shift(); // Remove header
  return lines.reduce((obj, line) => {
    const [key, value] = line.split('\t').map(v => v.trim());
    if (key) {
      obj[key] = value;
    }
    return obj;
  }, {} as Record<string, string>);
}

/**
 * Parses the UI Text TSV into a structured translations object.
 */
function parseTranslations(tsv: string): Record<Language, Record<string, string>> {
    const [headerLine, ...lines] = tsv.trim().split('\n');
    const headers = headerLine.split('\t').map(h => h.trim());
    const langKeys = headers.slice(1) as Language[];

    const translations: Record<Language, Record<string, string>> = {
        KA: {},
        EN: {},
        RU: {},
    };

    lines.forEach(line => {
        const values = line.split('\t').map(v => v.trim());
        const key = values[0];
        if (!key) return;

        langKeys.forEach((lang, index) => {
            translations[lang][key] = values[index + 1];
        });
    });

    return translations;
}


// --- Fetcher Functions ---

export async function fetchMenuData(): Promise<{ menu: MenuItem[] }> {
  const response = await fetch(GOOGLE_SHEET_URLS.MENU);
  if (!response.ok) throw new Error('Failed to fetch menu data');
  const tsv = await response.text();
  const menu = tsvToObjects<MenuItem>(tsv);
  
  return { menu };
}

export async function fetchBusinessConfig(): Promise<BusinessConfig> {
  const response = await fetch(GOOGLE_SHEET_URLS.CONFIG);
  if (!response.ok) throw new Error('Failed to fetch config data');
  const tsv = await response.text();
  const rawConfig = tsvToKeyValue(tsv);

  // Structure the flat key-value data into the required BusinessConfig shape
  return {
    addressKa: rawConfig.addressKa,
    addressEn: rawConfig.addressEn,
    addressRu: rawConfig.addressRu,
    phone: rawConfig.phone,
    hours: {
      open: rawConfig.hoursOpen,
      close: rawConfig.hoursClose,
    },
    deliveryLinks: {
      glovo: rawConfig.deliveryGlovo,
      wolt: rawConfig.deliveryWolt,
      bolt: rawConfig.deliveryBolt,
    },
    socials: {
      instagram: rawConfig.socialsInstagram,
      whatsapp: rawConfig.socialsWhatsapp,
      facebook: rawConfig.socialsFacebook,
    }
  };
}

export async function fetchTranslations(): Promise<Record<Language, Record<string, string>>> {
    const response = await fetch(GOOGLE_SHEET_URLS.UI_TEXT);
    if (!response.ok) throw new Error('Failed to fetch UI text data');
    const tsv = await response.text();
    return parseTranslations(tsv);
}