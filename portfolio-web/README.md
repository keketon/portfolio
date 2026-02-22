# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Internationalization (i18n)

This project includes a custom i18n system with LLM-powered auto-translation.

### Setup

1. **Get a Google Gemini API key**:
   - Visit [Google AI Studio](https://ai.google.dev/)
   - Generate an API key
   - Copy the example.env in the `portfolio-web` directory and update the line:
     ```
     GEMINI_API_KEY=your_api_key_here
     ```

### Workflow

#### 1. Extract Translatable Strings

Run the extraction script to find all `tr()` calls in your codebase:

```bash
npm run extract-i18n
```

This scans all `.ts` and `.tsx` files, finds strings wrapped in `tr()`, and adds missing entries to translation files with empty `translation` fields.

#### 2. Auto-Translate Missing Entries

Use the Google Gemini API to automatically translate empty entries:

```bash
# Translate all languages
npm run ai-translate

# Dry run (preview without changes)
npm run ai-translate-dryrun
```

### Adding a New Language

1. **Update `src/i18n/languages.json`**:
   ```json
   {
     "languages": [
       {
         "code": "es",
         "name": "Spanish",
         "nativeName": "Español",
         "isBase": false
       }
     ]
   }
   ```

2. **Create translation file**:
   ```bash
   echo "[]" > src/i18n/es.json
   ```

3. **Update `src/i18n/tr.tsx`** to import the new language:
   ```tsx
   import es from './es.json';
   
   const translations: Record<TranslationLanguage, TranslatedMessage[]> = {
     ja,
     es,  // Add your language here
   };
   ```

4. **Extract and translate**:
   ```bash
   npm run extract-i18n
   npm run ai-translate
   ```

### File Structure

```
src/i18n/
├── languages.json     # Language configuration
├── ja.json           # Japanese translations
├── tr.tsx            # Translation logic and useTr() hook
└── [lang].json       # Additional language files
```

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
