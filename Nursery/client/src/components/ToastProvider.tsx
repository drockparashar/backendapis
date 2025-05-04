'use client';

import { createContext, useState, useCallback, useContext, ReactNode } from 'react';

// Toast types
export type ToastType = 'success' | 'error';

interface Toast {
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
  hideToast: () => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<Toast | null>(null);

  // Function to show a toast
  const showToast = useCallback((message: string, type: ToastType = 'success') => {
    setToast({ message, type });

    // Auto hide toast after 3 seconds
    setTimeout(() => {
      setToast(null);
    }, 3000);
  }, []);

  // Function to hide toast
  const hideToast = useCallback(() => {
    setToast(null);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}

      {/* Toast component */}
      {toast && (
        <div className="fixed bottom-4 right-4 z-50 animate-fade-in">
          <div
            className={`px-4 py-2 rounded-md shadow-lg ${
              toast.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
            }`}
          >
            <div className="flex items-center">
              <span>{toast.message}</span>
              <button
                onClick={hideToast}
                className="ml-3 text-white"
                aria-label="Close"
              >
                ×
              </button>
            </div>
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
}

// Custom hook to use toast
export function useToast(): ToastContextType {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}