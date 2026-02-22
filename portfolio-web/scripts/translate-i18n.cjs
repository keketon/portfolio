#!/usr/bin/env node

/**
 * Auto-translation script using Google Gemini AI
 *
 * This script:
 * 1. Reads translation JSON files (e.g., ja.json)
 * 2. Identifies entries with empty translation fields
 * 3. Uses Google Gemini API to translate them
 * 4. Writes the translations back to the JSON files
 *
 * Usage:
 *   npm run translate              # Translate all languages
 *   npm run translate -- --lang=ja # Translate specific language
 *   npm run translate -- --dry-run # Preview without writing
 */

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Configuration
const I18N_DIR = path.resolve(__dirname, '../src/i18n');
const LANGUAGES_CONFIG_PATH = path.join(I18N_DIR, 'languages.json');
const BATCH_SIZE = 50; // Process translations in batches to avoid token limits
const RATE_LIMIT_DELAY = 1000; // Delay between API calls (ms)

// Parse command line arguments
const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');

// Validate API key
if (!process.env.GEMINI_API_KEY) {
  console.error('❌ Error: GEMINI_API_KEY not found in environment variables');
  console.error('   Please create a .env file with your API key:');
  console.error('   GEMINI_API_KEY=your_api_key_here');
  console.error('');
  console.error('   Get your API key from: https://ai.google.dev/');
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-3-flash-preview' });

/**
 * Load languages configuration
 */
function loadLanguagesConfig() {
  const config = JSON.parse(fs.readFileSync(LANGUAGES_CONFIG_PATH, 'utf-8'));
  return config.languages.filter(lang => !lang.isBase);
}

/**
 * Read translation file for a language
 */
function readTranslationFile(langCode) {
  const filePath = path.join(I18N_DIR, `${langCode}.json`);
  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️  Warning: Translation file ${langCode}.json not found`);
    return null;
  }
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

/**
 * Write translations back to file
 */
function writeTranslationFile(langCode, translations) {
  const filePath = path.join(I18N_DIR, `${langCode}.json`);
  fs.writeFileSync(filePath, JSON.stringify(translations, null, 2) + '\n', 'utf-8');
}

/**
 * Translate a batch of messages using Gemini
 */
async function translateBatch(messages, targetLanguage) {
  const prompt = `You are a professional translator. Translate the following English text to ${targetLanguage}.

Rules:
1. Preserve any special formatting (HTML tags, markdown, placeholders like {0}, {1}, etc.)
2. Maintain the tone and formality level appropriate for a professional portfolio website
3. If a context is provided, use it to disambiguate the translation
4. Return translations in the same order as the input
5. Return ONLY a JSON array of translated strings, no additional text or explanation

Input format: Array of objects with "message" (English text) and optional "context" (usage context)
Output format: Array of translated strings

Input:
${JSON.stringify(messages, null, 2)}

Output (JSON array only):`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // Extract JSON from response (handle cases where AI adds markdown code blocks)
    let jsonText = text.trim();
    if (jsonText.startsWith('```json')) {
      jsonText = jsonText.replace(/^```json\n?/, '').replace(/\n?```$/, '');
    } else if (jsonText.startsWith('```')) {
      jsonText = jsonText.replace(/^```\n?/, '').replace(/\n?```$/, '');
    }

    const translations = JSON.parse(jsonText);

    if (!Array.isArray(translations)) {
      throw new Error('Response is not an array: ' + jsonText);
    }

    return translations;
  } catch (error) {
    console.error('❌ Error during translation:', error.message);
    throw error;
  }
}

/**
 * Sleep for rate limiting
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Process translations for a language
 */
async function processLanguage(langConfig) {
  const { code, name, nativeName } = langConfig;

  console.log(`\n📖 Processing ${name} (${nativeName})...`);

  const translations = readTranslationFile(code);
  if (!translations) {
    return;
  }

  const missing = translations
    .map((entry, index) => ({ ...entry, originalIndex: index }))
    .filter(entry => !entry.translation.trim());

  if (missing.length === 0) {
    console.log(`✅ No missing translations for ${name}`);
    return;
  }

  console.log(`🔍 Found ${missing.length} missing translation(s)`);

  // Process in batches
  let translatedCount = 0;
  let errorCount = 0;

  for (let i = 0; i < missing.length; i += BATCH_SIZE) {
    const batch = missing.slice(i, i + BATCH_SIZE);
    const batchNum = Math.floor(i / BATCH_SIZE) + 1;
    const totalBatches = Math.ceil(missing.length / BATCH_SIZE);

    console.log(`🤖 Translating batch ${batchNum}/${totalBatches} (${batch.length} entries)...`);

    try {
      const messages = batch.map(entry => ({
        message: entry.message,
        context: entry.context,
      }));

      const translatedTexts = await translateBatch(messages, nativeName);

      if (dryRun) {
        console.log('translated strings:');
        batch.forEach((entry, idx) => {
          const translated = idx < translatedTexts.length ? translatedTexts[idx] : '(no translation)';
          console.log(`- ${entry.message} => ${translated}`);
        });
      }

      if (translatedTexts.length !== batch.length) {
        console.error(`⚠️  Warning: Expected ${batch.length} translations but got ${translatedTexts.length}`);
      }

      // Update translations
      batch.forEach((entry, idx) => {
        if (idx < translatedTexts.length && translatedTexts[idx]) {
          translations[entry.originalIndex].translation = translatedTexts[idx];
          translatedCount++;
        }
      });

      // Rate limiting
      if (i + BATCH_SIZE < missing.length) {
        await sleep(RATE_LIMIT_DELAY);
      }
    } catch (error) {
      console.error(`❌ Error processing batch ${batchNum}:`, error.message);
      errorCount += batch.length;
    }
  }

  // Write back to file
  if (translatedCount > 0) {
    if (!dryRun) {
      writeTranslationFile(code, translations);
    }
    console.log(`✅ Successfully translated ${translatedCount} entries for ${name}`);
  }

  if (errorCount > 0) {
    console.warn(`⚠️  Failed to translate ${errorCount} entries`);
  }
}

/**
 * Main function
 */
async function main() {
  console.log('🌍 Auto-Translation Script');
  console.log('==========================\n');

  if (dryRun) {
    console.log('🔍 Running in DRY-RUN mode (no changes will be made)\n');
  }

  const languages = loadLanguagesConfig();

  for (const lang of languages) {
    await processLanguage(lang);
  }

  console.log('\n✨ Translation complete!');
}

main();
