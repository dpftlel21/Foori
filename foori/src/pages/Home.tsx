import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import bookingInfo from '../assets/images/bookingInfo.png';
import consumption from '../assets/images/consumption.png';
import review from '../assets/images/review.png';
import search from '../assets/images/search.png';

const STYLES = {
  container: `
    w-full
    min-h-[768px]
    flex
    justify-center
    items-center
    md:h-[calc(100dvh-80px)]
    bg-[#FFE4D6]
  `,
  heroSection: `
    w-full
    h-full
    flex
    items-center
    overflow-hidden
  `,
  contentWrapper: `
    w-full
    h-full
    flex
    justify-center
    items-center
    px-4
    sm:px-6
    lg:px-8
  `,
  textContent: `
    w-full
    md:w-[40%]
    space-y-8
    z-20
    relative
    md:pl-20
    flex
    flex-col
    items-center
    md:items-start
  `,
  heading: `
    text-5xl
    lg:text-6xl
    font-bold
    text-gray-800
    leading-tight
    text-center
    md:text-left
  `,
  brandText: `
    text-[#FF6B3D]
  `,
  description: `
    text-xl
    text-gray-700
    text-center
    md:text-left
  `,
  ctaButton: `
    bg-[#FF6B3D]
    text-white
    px-8
    py-4
    rounded-xl
    font-medium
    transform
    hover:-translate-y-1
    hover:shadow-xl
    transition-all
    duration-300
    mb-8
    md:mb-0
  `,
  isometricContainer: `
    relative
    w-full
    md:w-[50%]
    h-[800px]
    hidden
    md:block
    z-10
    xl:scale-90
    2xl:scale-100
  `,
  isometricWrapper: `
    absolute
    inset-0
    transform
    perspective-1000
    rotate-x-12
    rotate-z-12
  `,
  card: `
    absolute
    rounded-2xl
    shadow-2xl
    overflow-hidden
    transition-all
    duration-500
    hover:shadow-3xl
    hover:-translate-y-2
    group
    cursor-pointer
  `,
  cardImage: `
    w-full
    h-full
    object-cover
    transition-transform
    duration-500
    group-hover:scale-105
  `,
  cardOverlay: `
    absolute
    inset-0
    bg-black/60
    opacity-0
    group-hover:opacity-100
    transition-opacity
    duration-300
    flex
    flex-col
    justify-center
    items-center
    p-6
    text-white
  `,
  cardTitle: `
    text-2xl
    font-bold
    mb-2
  `,
  cardDescription: `
    text-center
    text-sm
    leading-relaxed
  `,
  mobileContent: `
    md:hidden
    text-center
    mt-8
    px-4
  `,
} as const;

const Home = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/main');
  };

  // 텍스트 애니메이션 variants
  const textVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  // 카드 애니메이션 variants
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2 * i,
        duration: 0.8,
        ease: 'easeOut',
      },
    }),
  };

  return (
    <div className={STYLES.container}>
      <section className={STYLES.heroSection}>
        <div className={STYLES.contentWrapper}>
          <div className="flex flex-col lg:flex-row items-center justify-between w-full">
            {/* 왼쪽 텍스트 영역 */}
            <motion.div
              className={STYLES.textContent}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={textVariants}
            >
              <motion.h1 className={STYLES.heading} variants={textVariants}>
                맛있는 발견,
                <br />
                <span className={STYLES.brandText}>Foori</span>와 함께
              </motion.h1>
              <motion.p className={STYLES.description} variants={textVariants}>
                맛집 예약부터 리뷰까지,
                <br />
                당신의 미식 여정을 더 특별하게
              </motion.p>
              <motion.button
                className={STYLES.ctaButton}
                onClick={handleStart}
                variants={textVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                지금 시작하기
              </motion.button>
            </motion.div>

            {/* 오른쪽 3D 아이소메트릭 UI 영역 */}
            <div className={STYLES.isometricContainer}>
              <div className={STYLES.isometricWrapper}>
                {[
                  {
                    src: bookingInfo,
                    alt: '예약 정보',
                    className:
                      'left-[5%] top-[5%] w-[400px] h-[300px] -rotate-12',
                    zIndex: 1,
                  },
                  {
                    src: consumption,
                    alt: '소비 분석',
                    className:
                      'left-[25%] top-[20%] w-[380px] h-[285px] rotate-6',
                    zIndex: 2,
                  },
                  {
                    src: review,
                    alt: '리뷰',
                    className:
                      'left-[10%] top-[40%] w-[390px] h-[292px] -rotate-6',
                    zIndex: 3,
                  },
                  {
                    src: search,
                    alt: '검색',
                    className:
                      'left-[35%] top-[50%] w-[360px] h-[270px] rotate-12',
                    zIndex: 4,
                  },
                ].map((card, index) => (
                  <motion.div
                    key={card.alt}
                    className={`${STYLES.card} ${card.className}`}
                    style={{
                      zIndex: card.zIndex,
                      backdropFilter: 'blur(8px)',
                      WebkitBackdropFilter: 'blur(8px)',
                    }}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={index}
                    variants={cardVariants}
                  >
                    <img
                      src={card.src}
                      alt={card.alt}
                      className={STYLES.cardImage}
                      loading="lazy"
                      draggable="false"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
