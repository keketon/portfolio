import ja from './ja.json';
import useSearchParams from '@/hooks/useSearchParams';

export const SUPPORTED_LANGUAGES = ['en', 'ja'] as const;

export type SupportedLanguageType = (typeof SUPPORTED_LANGUAGES)[number];
export type TranslationLanguage = Exclude<SupportedLanguageType, 'en'>;

export type TranslatedMessage = {
  message: string;
  context?: string;
  translation: string;
};

const translations: Record<TranslationLanguage, TranslatedMessage[]> = {
  ja,
};

export default translations;

export const useTr = () => {
  const { searchParam } = useSearchParams();
  const lang = (searchParam('hl') as SupportedLanguageType) ?? 'ja';

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
      if (translation.message !== message) {
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
