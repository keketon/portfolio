import React from 'react';
import { AppContext } from './AppContext';

// This file was divided from each context file to avoid the below warning which happens when components and functions are exported from the same file.
// ===
// Warning: Fast refresh only works when a file only exports components. Use a new file to share constants or functions between components.'
// ===

export const useAppContext = () => {
  const context = React.useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
};
