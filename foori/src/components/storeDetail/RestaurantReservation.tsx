import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCrawledDataDetail } from '../../hooks/query/useCrawledData';
import ReservationModal from './reservationModal/ReservationModal';
import RestaurantReview from './reviewList/RestaurantReview';

const RestaurantReservation = () => {
  const { placeId } = useParams();
  const placeDetail = useCrawledDataDetail(placeId);
  const placeInfo = placeDetail.data;
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);

  const STYLES = {
    container: `
    w-full
    h-[calc(100vh-80px)]
    flex
    justify-center
    items-center
    bg-gradient-to-b
    from-[#ffecd2]
    to-[#fcb69f]
  `,
    contentContainer: `
    w-full
    max-w-[400px]
    mx-auto
    p-4
    bg-white
    border-2
    border-solid
    border-[#EE6677]
    rounded-2xl
    shadow-sm
    flex
    flex-col
    gap-4
    md:max-w-[1200px]
  `,

    infoSection: `
      p-4
      border-b
      border-gray-200
    `,

    headerContainer: `
      flex
      flex-col
      md:flex-row
      justify-between
      items-start
      md:items-center
      gap-4
    `,

    basicInfo: `
      space-y-2
    `,

    titleContainer: `
      flex
      items-center
      gap-3
    `,

    title: `
      text-xl
      font-bold
      text-gray-800
      md:text-2xl
    `,

    category: `
      px-2
      py-1
      bg-[#FF800B]/10
      text-[#FF800B]
      rounded-full
      text-sm
      font-medium
    `,

    rating: `
      text-base
      font-semibold
      text-gray-600
      md:text-lg
    `,

    reserveButton: `
      px-6
      py-2.5
      bg-[#FF800B]
      text-white
      rounded-lg
      hover:bg-[#fcb69f]
      transition
      duration-300
      font-medium
      shadow-sm
      hover:shadow-md
      text-sm
      md:text-base
    `,

    detailInfo: `
      mt-6
      space-y-3
    `,

    infoRow: `
      flex
      items-start
      gap-2
    `,

    infoLabel: `
      font-medium
      text-gray-700
      min-w-[80px]
      text-sm
      md:text-base
    `,

    infoValue: `
      text-gray-600
      text-sm
      md:text-base
    `,

    breakTimeValue: `
      text-[#d82035]
      text-sm
      md:text-base
    `,

    reviewSection: `
      p-4
    `,

    reviewHeader: `
      border-b
      border-gray-200
      pb-4
      mb-6
    `,

    reviewTitle: `
      text-xl
      font-bold
      text-gray-800
    `,

    reviewSubtitle: `
      text-sm
      text-gray-500
      mt-1
    `,

    reviewList: `
      max-h-[300px]
      overflow-y-auto
    `,
  };

  return (
    <div className={STYLES.container}>
      <div className={STYLES.contentContainer}>
        <div className={STYLES.infoSection}>
          <div className={STYLES.headerContainer}>
            <div className={STYLES.basicInfo}>
              <div className={STYLES.titleContainer}>
                <h1 className={STYLES.title}>{placeInfo?.name}</h1>
                <span className={STYLES.category}>{placeInfo?.category}</span>
              </div>
              <div className={STYLES.rating}>
                평점: {placeInfo?.rating_avg} / 5.0
              </div>
            </div>

            <button
              onClick={() => setIsReservationModalOpen(true)}
              className={STYLES.reserveButton}
            >
              예약하기
            </button>
          </div>

          <div className={STYLES.detailInfo}>
            <div className={STYLES.infoRow}>
              <span className={STYLES.infoLabel}>주소</span>
              <span className={STYLES.infoValue}>{placeInfo?.address}</span>
            </div>

            <div className={STYLES.infoRow}>
              <span className={STYLES.infoLabel}>영업시간</span>
              <span className={STYLES.infoValue}>
                {placeInfo?.openTime?.split(':').slice(0, 2).join(':')} ~{' '}
                {placeInfo?.closeTime?.split(':').slice(0, 2).join(':')}
              </span>
            </div>

            <div className={STYLES.infoRow}>
              <span className={STYLES.infoLabel}>브레이크타임</span>
              <span className={STYLES.breakTimeValue}>15:00 ~ 17:00</span>
            </div>
          </div>
        </div>

        <div className={STYLES.reviewSection}>
          <div className={STYLES.reviewHeader}>
            <h2 className={STYLES.reviewTitle}>리뷰 목록</h2>
            <p className={STYLES.reviewSubtitle}>
              방문하신 고객님들의 생생한 리뷰를 확인해보세요
            </p>
          </div>
          <div className={STYLES.reviewList}>
            <RestaurantReview restaurantId={Number(placeId)} />
          </div>
        </div>

        <ReservationModal
          isOpen={isReservationModalOpen}
          onClose={() => setIsReservationModalOpen(false)}
          placeInfo={placeInfo}
        />
      </div>
    </div>
  );
};

export default RestaurantReservation;
