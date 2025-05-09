import type { SupportedLanguageType } from '@/i18n/translations';
import React from 'react';

interface AppContextProps {
  lang: SupportedLanguageType;
  setLang: (lang: SupportedLanguageType) => void;
}

const AppContext = React.createContext<AppContextProps | undefined>(undefined);
const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLang] = React.useState<SupportedLanguageType>('ja');

  return <AppContext.Provider value={{ lang, setLang }}>{children}</AppContext.Provider>;
};

export { AppContext, AppContextProvider };
