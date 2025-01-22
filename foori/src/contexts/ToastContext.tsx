import React, { createContext, useCallback, useContext, useState } from 'react';
import Toast from '../components/common/Toast';

interface ToastContextType {
  showToast: (
    message: string,
    type: 'error' | 'info' | 'warning' | 'success',
  ) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<
    Array<{
      id: number;
      message: string;
      type: 'error' | 'info' | 'warning' | 'success';
    }>
  >([]);

  const showToast = useCallback(
    (message: string, type: 'error' | 'info' | 'warning' | 'success') => {
      const id = Date.now();
      setToasts((prev) => [...prev, { id, message, type }]);

      setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
      }, 3000);
    },
    [],
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-4 right-4 z-50 space-y-4">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            type={toast.type}
            message={toast.message}
            onClose={() =>
              setToasts((prev) => prev.filter((t) => t.id !== toast.id))
            }
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

// 기존 useToast 훅과 동일한 인터페이스 유지
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
