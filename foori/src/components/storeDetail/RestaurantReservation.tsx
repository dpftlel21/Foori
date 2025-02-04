import { motion } from 'framer-motion';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCrawledDataDetail } from '../../hooks/query/useGetCrawledData';
import ReservationModal from './reservationModal/ReservationModal';
import RestaurantReview from './reviewList/RestaurantReview';

const STYLES = {
  container: `
    w-full
    h-full
    md:h-[calc(100vh-80px)]
    flex
    justify-center
    items-center
    bg-gradient-to-b
    from-[#ffecd2]
    to-[#fcb69f]
  `,
  contentContainer: `
    w-full
    mx-auto
    p-4
    bg-white
    md:border-2
    md:border-solid
    md:border-[#EE6677]
    rounded-2xl
    shadow-sm
    flex
    flex-col
    gap-4
    max-w-[1200px]
    min-h-[700px]
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
} as const;

const RestaurantReservation = () => {
  const { placeId } = useParams();
  const placeDetail = useCrawledDataDetail(placeId as string);
  const placeInfo = placeDetail.data;
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);

  // 애니메이션 variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: 'beforeChildren',
        staggerChildren: 0.2,
      },
    },
  };

  const contentVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const infoSectionVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const reviewSectionVariants = {
    hidden: { x: 20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        delay: 0.2,
      },
    },
  };

  return (
    <motion.div
      className={STYLES.container}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className={STYLES.contentContainer}
        variants={contentVariants}
      >
        <motion.div
          className={STYLES.infoSection}
          variants={infoSectionVariants}
        >
          <div className={STYLES.headerContainer}>
            <div className={STYLES.basicInfo}>
              <div className={STYLES.titleContainer}>
                <motion.h1
                  className={STYLES.title}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {placeInfo?.name}
                </motion.h1>
                <motion.span
                  className={STYLES.category}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {placeInfo?.category}
                </motion.span>
              </div>
              <motion.div
                className={STYLES.rating}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                평점: {placeInfo?.rating_avg} / 5.0
              </motion.div>
            </div>

            <motion.button
              onClick={() => setIsReservationModalOpen(true)}
              className={STYLES.reserveButton}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              예약하기
            </motion.button>
          </div>

          <motion.div
            className={STYLES.detailInfo}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
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
          </motion.div>
        </motion.div>

        <motion.div
          className={STYLES.reviewSection}
          variants={reviewSectionVariants}
        >
          <div className={STYLES.reviewHeader}>
            <h2 className={STYLES.reviewTitle}>리뷰 목록</h2>
            <p className={STYLES.reviewSubtitle}>
              방문하신 고객님들의 생생한 리뷰를 확인해보세요
            </p>
          </div>
          <div className={STYLES.reviewList}>
            <RestaurantReview restaurantId={Number(placeId)} />
          </div>
        </motion.div>

        <ReservationModal
          isOpen={isReservationModalOpen}
          onClose={() => setIsReservationModalOpen(false)}
          placeInfo={placeInfo}
        />
      </motion.div>
    </motion.div>
  );
};

export default RestaurantReservation;
