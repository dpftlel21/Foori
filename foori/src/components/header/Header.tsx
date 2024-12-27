import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../api/auth';
import { cookieStorage } from '../../api/cookies';
import Logo from '../common/Logo';

const Header = () => {
  const navigate = useNavigate();
  const { userInfoQuery } = useAuth();
  const userInfo = userInfoQuery.data;

  const logout = () => {
    cookieStorage.removeToken();
    navigate('/login');
  };

  return (
    <header className="h-[20px] bg-gradient-to-r from-[#FFD4BC] to-[#FFBEA3] py-20 p-4 flex justify-between items-center">
      <Logo />
      <div className="flex gap-6">
        <Link to="/mypage">
          <span className="text-gray-800 hover:text-gray-600 transition-colors">
            마이 페이지
          </span>
        </Link>
        {userInfo ? (
          <div className="relative group">
            <span className="cursor-pointer text-gray-800">
              {userInfo.name} 님 환영합니다!
            </span>
            <div className="hidden group-hover:block absolute top-full right-0 bg-white shadow-md p-2 rounded">
              <button
                onClick={logout}
                className="text-red-500 hover:text-red-700"
              >
                로그아웃
              </button>
            </div>
          </div>
        ) : (
          <Link to="/login">
            <span className="text-gray-800 hover:text-gray-600 transition-colors">
              로그인하기
            </span>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
