import React from 'react';

// interface AppContextProps {}

/**
 * Once the language state existed but now nothing here.
 * Leave this for future use.
 */
const AppContext = React.createContext<object>({});
const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  return <AppContext.Provider value={{}}>{children}</AppContext.Provider>;
};

export { AppContext, AppContextProvider };
