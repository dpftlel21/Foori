import { Link, useNavigate } from 'react-router-dom';
import { cookieStorage } from '../../api/utils/cookies';
import { useUserInfo } from '../../hooks/query/useUserInfo';
import { RouteConst } from '../../interface/RouteConst';

const STYLES = {
  container: 'relative group',
  username: 'text-sm cursor-pointer text-gray-800',
  dropdown:
    'hidden group-hover:block absolute top-full right-0 mt-1 bg-white shadow-md rounded',
  logoutButton:
    'w-[4.5vw] p-3 text-sm text-left text-red-500 hover:text-red-700 hover:bg-gray-50',
  loginLink: 'text-sm text-gray-800 hover:text-gray-600',
} as const;

const UserMenu = () => {
  const navigate = useNavigate();
  const { data: userInfo } = useUserInfo();

  //console.log('UserMenu render:', { userInfo }); // 디버깅용

  // 로그아웃
  const handleLogout = () => {
    cookieStorage.removeToken();
    navigate(RouteConst.Login);
  };

  if (!userInfo) {
    return (
      <Link to={RouteConst.Login} className={STYLES.loginLink}>
        로그인
      </Link>
    );
  }

  return (
    <div className={STYLES.container}>
      <span className={STYLES.username}>{userInfo.name}님</span>
      <div className={STYLES.dropdown}>
        <button onClick={handleLogout} className={STYLES.logoutButton}>
          로그아웃
        </button>
      </div>
    </div>
  );
};

export default UserMenu;
