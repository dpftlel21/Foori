import Logo from "../common/Logo";

const Header = () => {
  const HeaderStylePC =
    "w-full h-[8vh] flex justify-around items-center bg-opacity-40 bg-gray-100 border border-gray-400 shadow-md text-xl font-bold sticky top-0";

  const HeaderStyleTablet =
    "w-full h-[8vh] flex justify-around items-center bg-opacity-40 bg-gray-100 border border-gray-400 shadow-md text-sm font-bold sticky top-0";

  const HeaderStyleMobile =
    "w-full h-[8vh] flex justify-around items-center bg-opacity-40 bg-gray-100 border border-gray-400 shadow-md text-sm font-bold absolute bottom-0";

  return (
    <div>
      {/* PC 버전 */}
      <header className={`hidden xl:flex ${HeaderStylePC}`}>
        <Logo />
        <h1>맛집 예약하기</h1>
        <h1>마이 페이지</h1>
        <h1>0000 님 환영합니다 !</h1>
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
        <Logo />
        <h1>맛집 예약하기</h1>
        <h1>마이 페이지</h1>
        <h1>0000 님 환영합니다 !</h1>
      </header>
    </div>
  );
};

export default Header;
