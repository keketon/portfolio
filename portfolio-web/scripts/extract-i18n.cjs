const fs = require('fs');
const path = require('path');

// Paths
const SRC_DIR = path.resolve(__dirname, '../src');
const I18N_DIR = path.resolve(__dirname, '../src/i18n');
const LANGUAGES_CONFIG_PATH = path.join(I18N_DIR, 'languages.json');

// Load languages from configuration (excluding base language 'en')
function loadTranslationLanguages() {
  const config = JSON.parse(fs.readFileSync(LANGUAGES_CONFIG_PATH, 'utf-8'));
  return config.languages
    .filter(lang => !lang.isBase)
    .map(lang => lang.code);
}

const TRANSLATION_LANGUAGES = loadTranslationLanguages();

// Helper to recursively get all .ts/.tsx files
function getAllSourceFiles(dir) {
  let files = [];
  for (const entry of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, entry);
    if (fs.statSync(fullPath).isDirectory()) {
      files = files.concat(getAllSourceFiles(fullPath));
    } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
      files.push(fullPath);
    }
  }
  return files;
}

// Extract tr() calls
function extractTrCalls(fileContent) {
  const regex = /tr\(\s*([`'\"])(.*?)\1\s*(?:,\s*([`'\"])(.*?)\3)?\s*\)/g;
  const results = [];
  let match;
  while ((match = regex.exec(fileContent)) !== null) {
    const message = match[2];
    const context = match[4];
    results.push({ message, context });
  }
  return results;
}

function main() {
  const files = getAllSourceFiles(SRC_DIR);
  const trCalls = files.flatMap(file => extractTrCalls(fs.readFileSync(file, 'utf-8')));

  // Process each language
  for (const lang of TRANSLATION_LANGUAGES) {
    const langFilePath = path.join(I18N_DIR, `${lang}.json`);

    // Read existing translations
    let translations = [];
    if (fs.existsSync(langFilePath)) {
      translations = JSON.parse(fs.readFileSync(langFilePath, 'utf-8'));
    }

    // Find missing translations
    const missing = trCalls.filter(
      call => !translations.some(t => t.message === call.message && (t.context ?? '') === (call.context ?? ''))
    );

    if (missing.length === 0) {
      console.log(`[${lang}] No missing translations found.`);
      continue;
    }

    // Add missing translations
    for (const m of missing) {
      const entry = { message: m.message, translation: '' };
      if (m.context) {
        entry.context = m.context;
      }
      translations.push(entry);
    }

    // Write back to JSON file
    fs.writeFileSync(langFilePath, JSON.stringify(translations, null, 2) + '\n', 'utf-8');
    console.log(`[${lang}] Added ${missing.length} missing translation(s) to ${lang}.json`);
  }
}

main();
