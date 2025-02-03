import { useEffect, useRef, useState } from 'react';
import { FaBars, FaTimes, FaUser } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';
import { cookieStorage } from '../../api/utils/cookies';
import { useUserInfo } from '../../hooks/query/useUserInfo';
import { RouteConst } from '../../interface/RouteConst';

const STYLES = {
  container: 'relative',
  userContainer: 'flex items-center gap-2 cursor-pointer',
  button:
    'p-2 text-gray-800 hover:text-gray-600 transition-colors flex items-center gap-2',
  userName: 'text-sm font-medium hidden md:inline', // 모바일에서 숨김
  menuIcon: 'text-gray-800',
  overlay: 'fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden',
  dropdown: `
    fixed md:absolute
    top-0 md:top-full
    right-0
    h-full md:h-auto
    w-64 md:w-48
    bg-white
    shadow-lg
    z-50
    transform transition-transform duration-300 ease-in-out
    md:transform-none md:transition-none
  `,
  mobileHeader: 'p-4 border-b md:hidden',
  closeButton:
    'absolute top-4 right-4 text-gray-500 hover:text-gray-700 md:hidden',
  menuItem:
    'block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left',
  activeMenuItem: 'bg-gray-100',
  mobileUserInfo: 'flex items-center gap-2 mt-2 md:hidden',
} as const;

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { data: userInfo } = useUserInfo();

  // 모바일 메뉴 열릴 때 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 로그아웃
  const handleLogout = () => {
    cookieStorage.removeToken();
    navigate(RouteConst.Login);
    setIsOpen(false);
  };

  return (
    <div className={STYLES.container} ref={dropdownRef}>
      {/* 메뉴 버튼 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={STYLES.button}
        aria-label="메뉴"
      >
        {userInfo ? (
          <div className={STYLES.userContainer}>
            <FaUser size={20} className={STYLES.menuIcon} />
            <span className={STYLES.userName}>{userInfo.name}님</span>
          </div>
        ) : (
          <FaBars size={20} className={STYLES.menuIcon} />
        )}
      </button>

      {/* 드롭다운 메뉴 */}
      {isOpen && (
        <>
          {/* 모바일 오버레이 */}
          <div className={STYLES.overlay} onClick={() => setIsOpen(false)} />

          {/* 메뉴 컨테이너 */}
          <div className={STYLES.dropdown}>
            {/* 모바일 헤더 */}
            <div className={STYLES.mobileHeader}>
              <button
                onClick={() => setIsOpen(false)}
                className={STYLES.closeButton}
                aria-label="메뉴 닫기"
              >
                <FaTimes size={20} />
              </button>
              {userInfo && (
                <div className={STYLES.mobileUserInfo}>
                  <FaUser size={20} />
                  <span className="text-sm font-medium">{userInfo.name}님</span>
                </div>
              )}
            </div>

            {/* 메뉴 아이템들 */}
            {userInfo ? (
              <>
                <NavLink
                  to={RouteConst.Main}
                  className={({ isActive }) =>
                    `${STYLES.menuItem} ${
                      isActive ? STYLES.activeMenuItem : ''
                    }`
                  }
                  onClick={() => setIsOpen(false)}
                >
                  예약하기
                </NavLink>
                <NavLink
                  to={RouteConst.MyPage}
                  className={({ isActive }) =>
                    `${STYLES.menuItem} ${
                      isActive ? STYLES.activeMenuItem : ''
                    }`
                  }
                  onClick={() => setIsOpen(false)}
                >
                  마이페이지
                </NavLink>
                <button
                  onClick={handleLogout}
                  className={`${STYLES.menuItem} text-red-500`}
                >
                  로그아웃
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to={RouteConst.Main}
                  className={({ isActive }) =>
                    `${STYLES.menuItem} ${
                      isActive ? STYLES.activeMenuItem : ''
                    }`
                  }
                  onClick={() => setIsOpen(false)}
                >
                  예약하기
                </NavLink>
                <NavLink
                  to={RouteConst.Login}
                  className={({ isActive }) =>
                    `${STYLES.menuItem} ${
                      isActive ? STYLES.activeMenuItem : ''
                    }`
                  }
                  onClick={() => setIsOpen(false)}
                >
                  로그인
                </NavLink>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Navigation;
