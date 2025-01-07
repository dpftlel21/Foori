import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCrawledDataDetail } from '../../api/crawledData';
import ReservationModal from './reservationModal/ReservationModal';
import RestaurantReview from './reviewList/RestaurantReview';

const RestaurantReservation = () => {
  const { placeId } = useParams();
  const placeDetail = useCrawledDataDetail(placeId);
  const placeInfo = placeDetail.data;
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);

  return (
    <div className="w-full h-[92dvh] flex justify-center items-center bg-gradient-to-b from-[#ffecd2] to-[#fcb69f]">
      <div className="w-[50%] h-[80%] bg-white rounded-xl shadow-lg border-solid border-2 border-[#EE6677]">
        {/* 상단 정보 섹션 */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            {/* 가게 기본 정보 */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-gray-800">
                  {placeInfo?.name}
                </h1>
                <span className="px-2 py-1 bg-[#FF800B]/10 text-[#FF800B] rounded-full text-sm font-medium">
                  {placeInfo?.category}
                </span>
              </div>
              <div className="text-lg font-semibold text-gray-600">
                평점: {placeInfo?.rating_avg} / 5.0
              </div>
            </div>

            {/* 예약 버튼 */}
            <button
              onClick={() => setIsReservationModalOpen(true)}
              className="px-6 py-2.5 bg-[#FF800B] text-white rounded-lg
                hover:bg-[#fcb69f] transition duration-300 font-medium
                shadow-sm hover:shadow-md"
            >
              예약하기
            </button>
          </div>

          {/* 상세 정보 */}
          <div className="mt-6 space-y-3">
            <div className="flex items-start gap-2">
              <span className="font-medium text-gray-700 min-w-[80px]">
                주소
              </span>
              <span className="text-gray-600">{placeInfo?.address}</span>
            </div>

            <div className="flex items-start gap-2">
              <span className="font-medium text-gray-700 min-w-[80px]">
                영업시간
              </span>
              <span className="text-gray-600">
                {placeInfo?.openTime?.split(':').slice(0, 2).join(':')} ~{' '}
                {placeInfo?.closeTime?.split(':').slice(0, 2).join(':')}
              </span>
            </div>

            <div className="flex items-start gap-2">
              <span className="font-medium text-gray-700 min-w-[80px]">
                브레이크타임
              </span>
              <span className="text-[#d82035]">15:00 ~ 17:00</span>
            </div>
          </div>
        </div>

        {/* 리뷰 섹션 */}
        <div className="p-6">
          <div className="border-b border-gray-200 pb-4 mb-6">
            <h2 className="text-xl font-bold text-gray-800">리뷰 목록</h2>
            <p className="text-sm text-gray-500 mt-1">
              방문하신 고객님들의 생생한 리뷰를 확인해보세요
            </p>
          </div>
          <div className="max-h-[300px] overflow-y-auto">
            <RestaurantReview restaurantId={Number(placeId)} />
          </div>
        </div>
      </div>

      {/* 예약 모달 */}
      <ReservationModal
        isOpen={isReservationModalOpen}
        onClose={() => setIsReservationModalOpen(false)}
        placeInfo={placeInfo}
      />
    </div>
  );
};

export default RestaurantReservation;
