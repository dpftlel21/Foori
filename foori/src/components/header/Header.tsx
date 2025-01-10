import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../api/auth';
import { cookieStorage } from '../../api/cookies';
import Logo from '../common/Logo';

const Header = () => {
  const navigate = useNavigate();
  const { userInfoQuery } = useAuth();
  const userInfo = userInfoQuery.data;
  //console.log('userInfo', userInfo);

  const logout = () => {
    cookieStorage.removeToken();
    navigate('/login');
  };

  return (
    <header
      className={`
  w-full h-20 md:h-20
  transition-all duration-300

  /* 모바일 스타일 */
  fixed bottom-0 md:relative
  bg-white md:bg-gradient-to-r from-[#FFD4BC] to-[#FFBEA3]

`}
    >
      <div className="h-full max-w-6xl mx-auto flex items-center">
        {/* PC 레이아웃 */}
        <div className="hidden md:flex w-full justify-between items-center">
          {/* 로고 + 푸리 */}
          <div className="flex items-center">
            <Logo /> {/* 로고 크기 조정 */}
          </div>

          {/* 네비게이션 메뉴 */}
          <div className="flex items-center gap-6">
            <Link
              to="/main"
              className="text-sm text-gray-800 hover:text-gray-600"
            >
              예약하기
            </Link>
            <Link
              to="/mypage"
              className="text-sm text-gray-800 hover:text-gray-600"
            >
              마이페이지
            </Link>
            {userInfo ? (
              <div className="relative group">
                <span className="text-sm cursor-pointer text-gray-800">
                  {userInfo.name}님
                </span>
                <div className="hidden group-hover:block absolute top-full right-0 mt-1 bg-white shadow-md rounded">
                  <button
                    onClick={logout}
                    className="w-[4.5vw] p-3 text-sm text-left text-red-500 hover:text-red-700 hover:bg-gray-50"
                  >
                    로그아웃
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="text-sm text-gray-800 hover:text-gray-600"
              >
                로그인
              </Link>
            )}
          </div>
        </div>

        {/* 모바일 레이아웃 */}
        <div className="md:hidden w-full flex justify-around items-center">
          <Link to="/main" className="flex flex-col items-center">
            <span className="text-lg">🗺️</span>
            <span className="text-[10px] text-gray-800">예약하기</span>
          </Link>
          <Link to="/mypage" className="flex flex-col items-center">
            <span className="text-lg">👤</span>
            <span className="text-[10px] text-gray-800">마이페이지</span>
          </Link>
          {userInfo ? (
            <div className="flex flex-col items-center">
              <span className="text-lg">👋</span>
              <span className="text-[10px] text-gray-800">
                {userInfo.name}님
              </span>
            </div>
          ) : (
            <Link to="/login" className="flex flex-col items-center">
              <span className="text-lg">🔑</span>
              <span className="text-[10px] text-gray-800">로그인</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
