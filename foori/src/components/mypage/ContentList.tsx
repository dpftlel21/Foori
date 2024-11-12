

const ContentList = () => {

    const ContentList = "w-[5vw] h-[3vh] flex justify-center text-center hover:bg-[#D87373] transition duration-500 ease-in-out";

    return (
      <ul className="w-[7vw] h-[50vh] flex flex-col justify-around shadow-lg border-r-2 border-solid border-[#EE6677]">
        <li className={ContentList}>프로필</li>
        <li className={ContentList}>예약 현황</li>
        <li className={ContentList}>소비 분석</li>
        <li className={ContentList}>내가 쓴 리뷰</li>
      </ul>
    );
}

export default ContentList