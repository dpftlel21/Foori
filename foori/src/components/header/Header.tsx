import Logo from "../common/Logo";
import Map from "../../assets/images/map.png";
import Myinfo from "../../assets/images/myInfo.png";
import { Link } from "react-router-dom";

const Header = () => {
  const HeaderStylePC =
    "w-full h-[8vh] flex justify-around items-center bg-opacity-40 bg-[#ce5a0d44] border border-gray-400 shadow-md text-xl font-bold sticky top-0";

  const HeaderStyleTablet =
    "w-full h-[8vh] flex justify-around items-center bg-opacity-40 bg-[#ce5a0d44] border border-gray-400 shadow-md text-sm font-bold sticky top-0";

  const HeaderStyleMobile =
    "w-full h-[8vh] flex justify-around items-center bg-opacity-40 bg-[#ce5a0d44] border border-gray-400 shadow-md text-sm font-bold absolute bottom-0";

  return (
    <div>
      {/* PC 버전 */}
      <header className={`hidden xl:flex ${HeaderStylePC}`}>
        <Logo />
        <Link to="/detail">
          <h1>맛집 예약하기</h1>
        </Link>
        <Link to="/mypage">
        <h1>마이 페이지</h1>
        </Link>
        <Link to="/login">
          <h1>0000 님 환영합니다 !</h1>
        </Link>
      </header>

      {/* 테블릿 및 데스크톱 버전 */}
      <header
        className={`hidden md:flex lg:flex xl:hidden ${HeaderStyleTablet}`}
      >
        <Logo />
        <h1>맛집 예약하기</h1>
        <h1>마이 페이지</h1>
        <h1>0000 님 환영합니다 !</h1>
      </header>

      {/* 모바일 버전 */}
      <header className={`block md:hidden ${HeaderStyleMobile}`}>
        <div className="w-[20%] h-[70%] flex flex-col justify-center items-center">
          <img src={Map} alt="map" className="w-[50%] h-[50%]" />
          <h1>예약하기</h1>
        </div>
        <Logo />
        <div className="w-[20%] h-[70%] flex flex-col justify-center items-center">
          <img src={Myinfo} alt="myPage" className="w-[45%] h-[50%]" />
          <h1>마이 페이지</h1>
        </div>
      </header>
    </div>
  );
};

export default Header;
