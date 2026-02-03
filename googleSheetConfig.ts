
// =================================================================================
// ACTION REQUIRED: CONFIGURE GOOGLE SHEETS
// =================================================================================
// 1. Create a Google Sheet with four tabs: 'Menu', 'Config', 'UI_Text', and 'Categories'.
// 2. For EACH tab, go to 'File > Share > Publish to web'.
// 3. Select the tab, choose 'Tab-separated values (.tsv)', and click 'Publish'.
// 4. Copy the generated URL and paste it below, replacing the placeholder.
//
// The site will use local data until these URLs are correctly configured.
// =================================================================================

export const GOOGLE_SHEET_URLS = {
  MENU: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSHbCBLTXJ3Kv4Ow3Brr8C6xeDDfPglyUJmo8qG878DFT1Bs95OWE2PAULmQr8g-kv4xUMq6e6GeNlN/pub?gid=0&single=true&output=tsv',
  CONFIG: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSHbCBLTXJ3Kv4Ow3Brr8C6xeDDfPglyUJmo8qG878DFT1Bs95OWE2PAULmQr8g-kv4xUMq6e6GeNlN/pub?gid=998226641&single=true&output=tsv',
  UI_TEXT: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSHbCBLTXJ3Kv4Ow3Brr8C6xeDDfPglyUJmo8qG878DFT1Bs95OWE2PAULmQr8g-kv4xUMq6e6GeNlN/pub?gid=318302949&single=true&output=tsv',
  // ACTION: Create a 'Categories' tab, publish it, and paste the .tsv URL here.
  // Columns should be: key, sortOrder, nameKa, nameEn, nameRu
  CATEGORIES: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSHbCBLTXJ3Kv4Ow3Brr8C6xeDDfPglyUJmo8qG878DFT1Bs95OWE2PAULmQr8g-kv4xUMq6e6GeNlN/pub?gid=76054856&single=true&output=tsv',
};
