import { useState } from "react";
import Icon from "../../assets/images/icon.png";
import ReservationModal from "./reservationModal/ReservationModal";

const StoreIfDetail = () => {
  const DetailContainer =
    "w-[80%] h-[80%] flex flex-col justify-around  bg-white rounded-xl shadow-xl border-2 border-solid border-[#EE6677]";
  // common
  const ReviewContent = "w-full h-[45%] flex flex-col justify-start";
  const StoreImgContainer = "w-full h-[10%] flex justify-start items-center";

  const Content = "w-full h-[30%] flex justify-around items-center";
  const StoreInfo = "w-full flex justify-between items-center";
  const DivideDiv =
    "w-[45%] h-[100%] flex flex-col justify-around items-center";
  const ButtonStyle =
    "w-[23%] h-[6vh] ml-[12%] mb-[12%] bg-[#FF800B] text-white rounded-md hover:bg-[#fcb69f] transition duration-500 ease-in-out";

  // 리뷰 스타일링
  const Review =
    "w-[50%] h-[100%] flex flex-col justify-around overflow-scroll overflow-x-hidden";
  const ReviewLi =
    "w-full h-[20%] flex justify-around items-center bg-[#F0CCCC] ";

  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);

  const openReservationModal = () => {
    setIsReservationModalOpen(true);
  };

  const closeReservationModal = () => {
    setIsReservationModalOpen(false);
  };

  return (
    <div className="w-full h-[92%] flex justify-center items-center">
      <div className={DetailContainer}>
        {/* 가게 정보, 예약버튼 */}
        <div className={Content}>
          <div className={DivideDiv}>
            {/* 가게명, 평점 */}
            <div className={StoreInfo}>
              <h1 className="border-b-2 border-solid border-[#e38994fb]">
                가게명 : 진주에서 젤루다가 맛있는 맛집!
              </h1>
              <h1 className="mr-[15%]">평점 : 4.5 / 5.0</h1>
            </div>

            {/* 가게 주소, 오픈 시간, 브레이크 타임 */}
            <div className="w-full ">
              <h1>가게 주소 : 경상남도 진주시 석갑로 101-11</h1>
              <h1>오픈 시간 : 10:00 ~ 20:00</h1>
              <h1>브레이크 타임 : 15:00 ~ 17:00</h1>
            </div>
          </div>

          {/* 예약 버튼 */}
          <div className={DivideDiv}>
            <button className={ButtonStyle} onClick={openReservationModal}>
              예약하기
            </button>
          </div>
        </div>

        {/* 가게 이미지 */}
        <div className={StoreImgContainer}>
          <img
            src={Icon}
            alt="storeImage"
            className="w-[15%] h-[100%] rounded-xl"
          />
        </div>

        {/* 리뷰 목록 */}
        <div className={ReviewContent}>
          <h1 className="mb-[2%] border-b-2 border-solid border-[#e38994fb]">
            리뷰 목록
          </h1>
          {/* 리뷰 */}
          <ul className={Review}>
            <li className={ReviewLi}></li>
            <li className={ReviewLi}></li>
            <li className={ReviewLi}></li>
            <li className={ReviewLi}></li>
          </ul>
        </div>
      </div>

      {/* 예약 모달 */}
      <ReservationModal isOpen={isReservationModalOpen} onClose={closeReservationModal} />
    </div>
  );
};

export default StoreIfDetail;
