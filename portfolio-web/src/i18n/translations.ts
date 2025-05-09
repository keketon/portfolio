export const SUPPORTED_LANGUAGES = ['en', 'ja'] as const;

export type SupportedLanguageType = (typeof SUPPORTED_LANGUAGES)[number];
export type TranslationLanguage = Exclude<SupportedLanguageType, 'en'>;
type TranslatedMessage = {
  message: string;
  context?: string;
  translation: string;
};

const translations: Record<TranslationLanguage, TranslatedMessage[]> = {
  ja: [
    {
      message: 'Full-Stack Developer',
      context: 'LeftPane',
      translation: 'フルスタックエンジニア',
    },
    {
      message: 'Prime Factorization Game',
      context: 'LeftPane',
      translation: '素因数分解ゲーム',
    },
  ],
};

export default translations;
