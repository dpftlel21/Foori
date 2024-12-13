import { createContext, useContext, useState, memo } from 'react';
import Toast from '../components/common/Toast';
type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastMessage {
  id: number;
  type: ToastType;
  message: string;
  onClose: () => void;
}

interface ToastContextType {
  toasts: ToastMessage[];
  showToast: (message: string, type?: ToastType) => void;
  hideToast: (id: number) => void;
}

const ToastContext = createContext<ToastContextType>({
  toasts: [],
  showToast: () => {},
  hideToast: () => {},
});

export const ToastProvider = memo(
  ({ children }: { children: React.ReactNode }) => {
    const [toasts, setToasts] = useState<ToastMessage[]>([]);

    const showToast = (message: string, type: ToastType = 'info') => {
      const id = Date.now();
      const timeoutId = setTimeout(() => {
        hideToast(id);
      }, 3000);

      setToasts((prev) => [
        ...prev,
        {
          id,
          type,
          message,
          onClose: () => {
            clearTimeout(timeoutId);
            hideToast(id);
          },
        },
      ]);
    };

    const hideToast = (id: number) => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    };

    return (
      <ToastContext.Provider value={{ toasts, showToast, hideToast }}>
        {children}
        <div className="toast-container fixed top-4 right-4 z-50 flex flex-col gap-2">
          {toasts.map((toast) => (
            <Toast
              key={toast.id}
              message={toast.message}
              type={toast.type}
              onClose={toast.onClose}
            />
          ))}
        </div>
      </ToastContext.Provider>
    );
  },
);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
