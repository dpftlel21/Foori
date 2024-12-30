import { createContext, ReactNode, useContext, useState } from 'react';

type TabType = 'consumption' | 'review' | 'editProfile'; // 초기값 타입 추가

interface MyPageContextType {
  currentTab: TabType;
  setCurrentTab: (tab: TabType) => void;
  resetTab: () => void; // 초기화 함수 추가
}

const MyPageContext = createContext<MyPageContextType | undefined>(undefined);

export const MyPageProvider = ({ children }: { children: ReactNode }) => {
  const [currentTab, setCurrentTab] = useState<TabType>('editProfile'); // 초기값 변경

  const resetTab = () => {
    setCurrentTab('editProfile'); // 초기 상태로 리셋
  };

  return (
    <MyPageContext.Provider value={{ currentTab, setCurrentTab, resetTab }}>
      {children}
    </MyPageContext.Provider>
  );
};

export const useMyPage = () => {
  const context = useContext(MyPageContext);
  if (context === undefined) {
    throw new Error('useMyPage must be used within a MyPageProvider');
  }
  return context;
};
