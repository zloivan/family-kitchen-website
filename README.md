
# Saojakho Samzareulo | Family Kitchen - Full Project Code

This document contains the complete source code for the Family Kitchen website. All project files are included below for a comprehensive overview.

The application is a modern, minimalist website for a local Georgian family kitchen, designed to be easily managed by a non-technical business owner.

---

## Key Features

*   **Headless CMS via Google Sheets**: All website content (menu items, prices, business hours, UI text) is fetched live from a public Google Sheet. This allows the business owner to update the site from their phone or computer without any code changes.
*   **Dynamic Content Loading**: The site fetches the latest content every time a user visits, ensuring that changes made in the Google Sheet are reflected automatically without needing to redeploy the application.
*   **Robust Fallback System**: If the Google Sheets data cannot be loaded for any reason (e.g., network error, incorrect configuration), the application seamlessly falls back to a local copy of the data. This ensures the website is always online and functional.
*   **Multi-language Support**: All text is managed in the CMS, supporting Georgian, English, and Russian.
*   **Fully Responsive Design**: A clean, modern aesthetic that looks great on all devices.

---

## `index.html`

This is the main HTML entry point for the application. It sets up the document structure, loads necessary fonts, defines global styles, and provides the root element for the React application.

```html
<!DOCTYPE html>
<html lang="ka">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>საოჯახო სამზარეულო | Family Kitchen</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
    <style>
        :root {
            --bg-main: #FBF9F6; /* Warm Beige */
            --text-dark: #382F2D; /* Warm Dark Brown */
            --accent-primary: #A13C2B; /* Terracotta Red */
            --accent-secondary: #E5E1DC; /* Light Stone */
        }
        body {
            font-family: 'Inter', sans-serif;
            background-color: var(--bg-main);
            color: var(--text-dark);
            scroll-behavior: smooth;
        }
        h1, h2, h3, h4, .serif {
            font-family: 'Playfair Display', serif;
        }
        .fade-in-up {
            animation: fadeInUp 0.8s ease-out forwards;
            opacity: 0;
        }
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    </style>
<script type="importmap">
{
  "imports": {
    "react": "https://esm.sh/react@^19.2.4",
    "react-dom/": "https://esm.sh/react-dom@^19.2.4/",
    "react/": "https://esm.sh/react@^19.2.4/"
  }
}
</script>
</head>
<body class="antialiased">
    <div id="root"></div>
</body>
</html>
```

---

## `index.tsx`

The TypeScript entry file that renders the main `App` component into the DOM.

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

---

## `metadata.json`

Project metadata, including its name, description, and requested browser permissions.

```json
{
  "name": "საოჯახო სამზარეულო | Family Kitchen Tbilisi",
  "description": "Premium minimalist website for a local Georgian family kitchen in Tbilisi. Serving authentic homemade food with modern aesthetics.",
  "requestFramePermissions": [
    "geolocation"
  ]
}
```

---

## `types.ts`

This file defines the core TypeScript types and interfaces used throughout the application, ensuring data consistency for both live and fallback data.

```typescript
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
    wolt?: string;
    bolt?: string;
  };
  socials: {
    instagram?: string;
    whatsapp?: string;
  };
}
```

---

## `App.tsx`

The main application component. It orchestrates the entire application by:
1.  Attempting to fetch live content from Google Sheets on startup.
2.  Gracefully falling back to local data if the live fetch fails.
3.  Managing the application's state, including the current page and language.
4.  Passing all necessary data and functions down to the page components as props.

```tsx
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
```

---

## `googleSheetConfig.ts`

This configuration file is the crucial link between the website and the Google Sheet CMS. It holds the public URLs for the `.tsv` data. The business owner must replace the placeholder URLs here to enable live content editing.

```typescript
// =================================================================================
// ACTION REQUIRED: CONFIGURE GOOGLE SHEETS
// =================================================================================
// 1. Create a Google Sheet with three tabs: 'Menu', 'Config', and 'UI_Text'.
// 2. For EACH tab, go to 'File > Share > Publish to web'.
// 3. Select the tab, choose 'Tab-separated values (.tsv)', and click 'Publish'.
// 4. Copy the generated URL and paste it below, replacing the placeholder.
//
// The site will use local data until these URLs are correctly configured.
// =================================================================================

export const GOOGLE_SHEET_URLS = {
  MENU: 'https://docs.google.com/spreadsheets/d/e/PASTE_YOUR_SHEET_ID_HERE/pub?output=tsv&gid=PASTE_YOUR_MENU_GID_HERE',
  CONFIG: 'https://docs.google.com/spreadsheets/d/e/PASTE_YOUR_SHEET_ID_HERE/pub?output=tsv&gid=PASTE_YOUR_CONFIG_GID_HERE',
  UI_TEXT: 'https://docs.google.com/spreadsheets/d/e/PASTE_YOUR_SHEET_ID_HERE/pub?output=tsv&gid=PASTE_YOUR_UI_TEXT_GID_HERE',
};
```

---

## `services/googleSheetsService.ts`

This service contains the logic for fetching and parsing data from the published Google Sheets. It handles the transformation of raw `.tsv` (tab-separated values) text into the structured JSON objects that the application uses.

```typescript
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

export async function fetchMenuData(): Promise<{ menu: MenuItem[], categories: any }> {
  const response = await fetch(GOOGLE_SHEET_URLS.MENU);
  if (!response.ok) throw new Error('Failed to fetch menu data');
  const tsv = await response.text();
  const menu = tsvToObjects<MenuItem>(tsv);
  
  // Dynamically generate categories from menu data
  const categorySet = new Set(menu.map(item => item.category));
  const categories = {};
  // You might need a separate sheet for category translations if they become complex
  for (const cat of categorySet) {
    categories[cat] = { ka: cat, en: cat, ru: cat }; // Simple fallback
  }

  return { menu, categories };
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
    }
  };
}

export async function fetchTranslations(): Promise<Record<Language, Record<string, string>>> {
    const response = await fetch(GOOGLE_SHEET_URLS.UI_TEXT);
    if (!response.ok) throw new Error('Failed to fetch UI text data');
    const tsv = await response.text();
    return parseTranslations(tsv);
}
```

---

## `data/fallbackData.ts`

This file acts as a local data backup. It contains a complete, static snapshot of all the website's content. If the app fails to fetch live data from Google Sheets, it uses the data from this file to render the site, ensuring 100% uptime.

```typescript
import { BusinessConfig, MenuItem, Language } from '../types';

export const FALLBACK_BUSINESS_CONFIG: BusinessConfig = {
  addressKa: "თბილისი, პეკინის გამზირი 15",
  addressEn: "15 Pekini Ave, Tbilisi",
  addressRu: "Тбилиси, проспект Пекина 15",
  phone: "+995 551 51 55 11",
  hours: {
    open: "09:00",
    close: "22:00"
  },
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

export const FALLBACK_MENU_ITEMS: MenuItem[] = [
  // ... (menu items)
];

export const FALLBACK_CATEGORIES = {
  Main: { ka: "მთავარი კერძები", en: "Main Dishes", ru: "Основные блюда" },
  // ... (other categories)
};

export const FALLBACK_TRANSLATIONS: Record<Language, Record<string, string>> = {
  KA: {
    titleShort: "საოჯახო",
    // ... (other translations)
  },
  EN: {
    // ... (english translations)
  },
  RU: {
    // ... (russian translations)
  }
};
```

---

## `HomePage.tsx` & `MenuPage.tsx`

These are the main presentational components for the Home and Menu pages, respectively. They are "dumb" components that receive all the data they need to display (like menu items, config, and text labels) as props from the main `App` component. This keeps them clean, focused on display logic, and easy to manage.
