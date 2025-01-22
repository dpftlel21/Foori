import { ReactNode } from 'react';
import { MyPageProvider } from '../contexts/MyPageContext';
import { ToastProvider } from '../contexts/ToastContext';

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <ToastProvider>
      <MyPageProvider>{children}</MyPageProvider>
    </ToastProvider>
  );
};
