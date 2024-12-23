import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../api/auth';
import { cookieStorage } from '../../api/cookies';
import Map from '../../assets/images/map.png';
import MyInfo from '../../assets/images/myInfo.png';
import Logo from '../common/Logo';

const Header = () => {
  const navigate = useNavigate();
  const { userInfoQuery } = useAuth();
  const userInfo = userInfoQuery.data;
  //console.log("유저 정보", userInfo);

  const logout = () => {
    cookieStorage.removeToken();
    navigate('/login');
  };

  return (
    <header
      className={`
      w-full h-[8vh]
      flex justify-around items-center
      bg-opacity-40 bg-[#ce5a0d44]
      border border-gray-400 shadow-md
      font-bold
      md:text-sm xl:text-xl
      md:sticky md:top-0
      block absolute bottom-0 md:relative md:bottom-auto
    `}
    >
      {/* 모바일에서만 보이는 아이콘형 메뉴 */}
      <div className="flex md:hidden">
        <div className="w-[20%] h-[70%] flex flex-col justify-center items-center">
          <img src={Map} alt="map" className="w-[50%] h-[50%]" />
          <span>예약하기</span>
        </div>
        <Logo />
        <div className="w-[20%] h-[70%] flex flex-col justify-center items-center">
          <img src={MyInfo} alt="myPage" className="w-[45%] h-[50%]" />
          <span>마이 페이지</span>
        </div>
      </div>

      {/* 태블릿/PC에서 보이는 텍스트형 메뉴 */}
      <div className="hidden md:flex items-center justify-around w-full">
        <Logo />
        <Link to="/detail">
          <span>맛집 예약하기</span>
        </Link>
        <Link to="/mypage">
          <span>마이 페이지</span>
        </Link>
        {userInfo ? (
          <div className="relative group">
            <span className="cursor-pointer">
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
            <span>로그인하기</span>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
