import ja from './ja.json';
import languagesConfig from './languages.json';
import useSearchParams from '@/hooks/useSearchParams';

export const SUPPORTED_LANGUAGES = languagesConfig.languages.map(lang => lang.code) as readonly string[];

export type TranslatedMessage = {
  message: string;
  context?: string;
  translation: string;
};

export type LanguageConfig = {
  code: string;
  name: string;
  nativeName: string;
  isBase: boolean;
};

// Language configurations
export const languages: LanguageConfig[] = languagesConfig.languages;

const translations: Record<string, TranslatedMessage[]> = {
  ja,
};

export default translations;

export const useTr = () => {
  const { searchParam } = useSearchParams();
  const lang = searchParam('hl') ?? 'ja';

  /**
   * Return translated message whose context matches.
   * If the translation found but the context in the translation file is nothing, it's treated as a fallback.
   * If the translation is not found, return the original message.
   */
  const tr = (message: string, context?: string) => {
    if (lang === 'en') {
      return message;
    }

    let noContextTranslation = message;

    for (const translation of translations[lang]) {
      if (translation.message !== message || translation.translation === '') {
        continue;
      }

      if (!translation.context) {
        if (!context) {
          return translation.translation;
        } else {
          noContextTranslation = translation.translation;
        }
      }

      if (translation.context === context) {
        return translation.translation;
      }
    }

    return noContextTranslation;
  };

  return { tr };
};
