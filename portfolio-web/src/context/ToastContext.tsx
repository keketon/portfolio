import * as Toast from '@radix-ui/react-toast';
import React, { useCallback } from 'react';
import { ToastContext, type ToastMessage } from './ToastContextValue';

const DEFAULT_DURATION = 4000;

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = React.useState<ToastMessage[]>([]);

  const addToast = useCallback(
    (message: ToastMessage) => {
      if (message.id && toasts.some(toast => toast.id === message.id)) {
        return;
      }

      const messageInternal = {
        ...message,
        id: message.id || crypto.randomUUID(),
        duration: message.duration || DEFAULT_DURATION,
      };

      setToasts(prev => [...prev, messageInternal]);

      setTimeout(() => {
        setToasts(prev => prev.filter(toast => toast.id !== messageInternal.id));
      }, messageInternal.duration);
    },
    [toasts]
  );

  return (
    <ToastContext.Provider value={{ toasts, addToast }}>
      <Toast.Provider swipeDirection="right">
        {children}
        <Toast.Viewport className="fixed bottom-0 left-0 z-1000 flex flex-col p-4 gap-2 w-[420px] max-w-[100vw]" />
        {toasts.map(toast => (
          <Toast.Root
            key={toast.id}
            className={`p-4 flex items-start ${
              toast.type === 'error'
                ? 'bg-red-500 text-white border border-red-600'
                : toast.type === 'success'
                  ? 'bg-green-500 text-white border border-green-600'
                  : 'bg-blue-500 text-white border border-blue-600'
            }`}
            duration={toast.duration}
          >
            <div className="flex flex-col gap-1 flex-1">
              {toast.title && <Toast.Title className="font-semibold">{toast.title}</Toast.Title>}
              {toast.description && (
                <Toast.Description className="z-1001 text-sm opacity-90">{toast.description}</Toast.Description>
              )}
            </div>
          </Toast.Root>
        ))}
      </Toast.Provider>
    </ToastContext.Provider>
  );
};
