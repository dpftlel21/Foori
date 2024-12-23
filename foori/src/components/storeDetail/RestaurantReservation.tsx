import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCrawledDataDetail } from '../../api/crawledData';
import Icon from '../../assets/images/icon.png';
import ReservationModal from './reservationModal/ReservationModal';

const RestaurantReservation = () => {
  const DetailContainer =
    'w-[95%] md:w-[80%] h-[90%] md:h-[80%] flex flex-col justify-around bg-white rounded-xl shadow-xl border-2 border-solid border-[#EE6677]';

  // common
  const ReviewContent = 'w-full h-[40%] md:h-[45%] flex flex-col justify-start';
  const StoreImgContainer =
    'w-full h-auto md:h-[10%] flex justify-start items-center py-4 md:py-0';

  const Content =
    'w-full h-auto md:h-[30%] p-[3%] md:p-[1.5%] flex flex-col justify-between';
  const StoreInfoContainer =
    'w-full flex flex-col md:flex-row justify-between items-start md:items-center';
  const StoreTitleContainer =
    'w-full md:w-[20vw] flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-0 mb-4 md:mb-0';

  const StoreName =
    'text-lg md:text-xl font-bold border-b-2 border-solid border-[#e38994fb]';
  const Category = 'text-sm text-[#FF800B] font-semibold md:ml-2';
  const Rating = 'md:ml-[13%] font-bold';
  const InfoText = 'mb-3 font-bold text-sm md:text-base';
  const OpenTimeText = 'mb-3 font-bold text-base md:text-lg';
  const BreakTimeText = 'mb-3 font-bold text-base md:text-lg text-[#d82035fa]';
  const ButtonStyle =
    'w-[100px] md:w-[120px] h-[35px] md:h-[40px] bg-[#FF800B] text-white rounded-md hover:bg-[#fcb69f] transition duration-500 ease-in-out font-bold';

  // 리뷰 스타일링
  const Review =
    'w-full md:w-[50%] h-[100%] flex flex-col justify-around overflow-scroll overflow-x-hidden';
  const ReviewLi =
    'w-full h-[20%] flex justify-around items-center bg-[#F0CCCC] mb-2';

  // 파라미터 받아와서, 상세 조회
  const { placeId } = useParams();
  const placeDetail = useCrawledDataDetail(placeId);
  const placeInfo = placeDetail.data;
  console.log('placeInfo', placeInfo);
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);

  const openReservationModal = () => {
    setIsReservationModalOpen(true);
  };

  const closeReservationModal = () => {
    setIsReservationModalOpen(false);
  };

  return (
    <div className="w-full h-[92%] flex justify-center items-center p-4">
      <div className={DetailContainer}>
        {/* 가게 정보, 예약버튼 */}
        <div className={Content}>
          <div className={StoreInfoContainer}>
            {/* 가게명, 카테고리, 평점 */}
            <div className={StoreTitleContainer}>
              <h1 className={StoreName}>{placeInfo?.name}</h1>
              <span className={Category}>{placeInfo?.category}</span>
              <h1 className={Rating}>평점 : {placeInfo?.rating_avg} / 5.0</h1>
            </div>

            {/* 예약 버튼 */}
            <button className={ButtonStyle} onClick={openReservationModal}>
              예약하기
            </button>
          </div>

          {/* 가게 주소, 오픈 시간, 브레이크 타임 */}
          <div className="mt-4">
            <h1 className={InfoText}>가게 주소 : {placeInfo?.address}</h1>
            <h1 className={OpenTimeText}>
              오픈 시간 :{' '}
              {placeInfo?.openTime?.split(':').slice(0, 2).join(':')} ~{' '}
              {placeInfo?.closeTime?.split(':').slice(0, 2).join(':')}
            </h1>
            <h1 className={BreakTimeText}>브레이크 타임 : 15:00 ~ 17:00</h1>
          </div>
        </div>

        {/* 가게 이미지 */}
        <div className={StoreImgContainer}>
          <img
            src={Icon}
            alt="storeImage"
            className="w-[30%] md:w-[15%] h-[100%] rounded-xl"
          />
        </div>

        {/* 리뷰 목록 */}
        <div className={ReviewContent}>
          <h1 className="mb-[2%] border-b-2 border-solid border-[#e38994fb] text-base md:text-lg font-bold">
            리뷰 목록
          </h1>
          {/* 리뷰 */}
          <ul className={Review}>
            {/* {placeInfo?.reviews.map((review: any) => (
              <li className={ReviewLi} key={review.id}>
                {review.content}
              </li>
            ))} */}
            <li className={ReviewLi}></li>
            <li className={ReviewLi}></li>
            <li className={ReviewLi}></li>
            <li className={ReviewLi}></li>
          </ul>
        </div>
      </div>

      {/* 예약 모달 */}
      <ReservationModal
        isOpen={isReservationModalOpen}
        onClose={closeReservationModal}
        placeInfo={placeInfo}
      />
    </div>
  );
};

export default RestaurantReservation;
