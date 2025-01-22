import { ReactNode } from 'react';

interface MenuContainerProps {
  children: ReactNode;
}
// 메뉴 컨테이너 (공통 스타일, 마이페이지)
const MenuContainer = ({ children }: MenuContainerProps) => {
  return (
    <div className="w-full h-[calc(100vh-25rem)] flex flex-col justify-center items-center ">
      {children}
    </div>
  );
};

export default MenuContainer;
