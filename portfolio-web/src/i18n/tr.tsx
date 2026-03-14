import ja from './ja.json';
import zh from './zh.json';
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
  zh,
};

export default translations;

/**
 * Replace variables in a message string
 * @param message - Message with placeholders like [0], [1], [2]...
 * @param variables - Array of values to replace placeholders with
 * @returns Message with placeholders replaced by variables
 */
function replaceVariables(message: string, variables: (string | number)[]): string {
  if (variables.length === 0) {
    return message;
  }

  return message.replace(/\[(\d+)\]/g, (match, index) => {
    const varIndex = parseInt(index, 10);
    return varIndex < variables.length ? String(variables[varIndex]) : match;
  });
}

export const useTr = () => {
  const { searchParam } = useSearchParams();
  const lang = searchParam('hl') ?? 'ja';

  /**
   * Return translated message whose context matches.
   * If the translation found but the context in the translation file is nothing, it's treated as a fallback.
   * If the translation is not found, return the original message.
   *
   * Supports variable substitution: Use [0], [1], [2]... in the message and pass corresponding variables.
   * @example tr("Hello [0], you have [1] messages", "Greeting", "John", 5) => "Hello John, you have 5 messages"
   */
  const tr = (message: string, context?: string, ...variables: (string | number)[]) => {
    if (lang === 'en') {
      return replaceVariables(message, variables);
    }

    let noContextTranslation = message;

    for (const translation of translations[lang]) {
      if (translation.message !== message || translation.translation === '') {
        continue;
      }

      if (!translation.context) {
        if (!context) {
          return replaceVariables(translation.translation, variables);
        } else {
          noContextTranslation = translation.translation;
        }
      }

      if (translation.context === context) {
        return replaceVariables(translation.translation, variables);
      }
    }

    return replaceVariables(noContextTranslation, variables);
  };

  return { tr };
};
