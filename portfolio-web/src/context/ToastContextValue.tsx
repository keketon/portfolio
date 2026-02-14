import React from 'react';
export interface ToastMessage {
  id?: string;
  title?: string;
  description?: string;
  duration?: number;
  type: 'error' | 'success' | 'info';
}

export const ToastContext = React.createContext<{
  toasts: ToastMessage[];
  addToast: (message: ToastMessage) => void;
}>({ toasts: [], addToast: () => {} });
