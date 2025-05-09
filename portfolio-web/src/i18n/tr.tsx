import { useAppContext } from '@/context/useInternalContexts';
import translations from './translations';

export const useTr = () => {
  const { lang } = useAppContext();

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
