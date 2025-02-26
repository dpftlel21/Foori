import { useNavigate } from 'react-router-dom';
import bookingInfo from '../assets/images/bookingInfo.png';
import consumption from '../assets/images/consumption.png';
import review from '../assets/images/review.png';
import search from '../assets/images/search.png';

const STYLES = {
  container: `
    w-full
    min-h-[calc(100dvh-5rem)]
    flex
    justify-center
    items-center
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
  fadeInUp: `
    opacity: 0
    transform: translateY(20px)
    animation: fadeInUp 0.6s ease-out forwards
  `,
  cardAnimation: `
    opacity: 0
    transform: translateY(50px)
    animation: cardFadeIn 0.8s ease-out forwards
  `,
} as const;

const animations = `
  @keyframes fadeInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes cardFadeIn {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Home = () => {
  const navigate = useNavigate();

  const cards = [
    {
      src: bookingInfo,
      alt: '예약 정보',
      className: 'left-[5%] top-[5%] w-[400px] h-[300px] -rotate-12',
      zIndex: 1,
    },
    {
      src: consumption,
      alt: '소비 분석',
      className: 'left-[25%] top-[20%] w-[380px] h-[285px] rotate-6',
      zIndex: 2,
    },
    {
      src: review,
      alt: '리뷰',
      className: 'left-[10%] top-[40%] w-[390px] h-[292px] -rotate-6',
      zIndex: 3,
    },
    {
      src: search,
      alt: '검색',
      className: 'left-[35%] top-[50%] w-[360px] h-[270px] rotate-12',
      zIndex: 4,
    },
  ];

  return (
    <div className={STYLES.container}>
      <style>{animations}</style>
      <section className={STYLES.heroSection}>
        <div className={STYLES.contentWrapper}>
          <div className="flex flex-col lg:flex-row items-center justify-between w-full">
            {/* motion.div를 일반 div로 변경 */}
            <div className={`${STYLES.textContent} ${STYLES.fadeInUp}`}>
              <h1 className={STYLES.heading}>
                맛있는 발견,
                <br />
                <span className={STYLES.brandText}>Foori</span>와 함께
              </h1>
              <p className={STYLES.description}>
                맛집 예약부터 리뷰까지,
                <br />
                당신의 미식 여정을 더 특별하게
              </p>
              <button
                className={`${STYLES.ctaButton} hover:scale-105 active:scale-95 transition-transform`}
                onClick={() => navigate('/main')}
              >
                지금 시작하기
              </button>
            </div>

            <div className={STYLES.isometricContainer}>
              <div className={STYLES.isometricWrapper}>
                {cards.map((card, index) => (
                  <div
                    key={card.alt}
                    className={`${STYLES.card} ${card.className} ${STYLES.cardAnimation}`}
                    style={{
                      zIndex: card.zIndex,
                      backdropFilter: 'blur(8px)',
                      WebkitBackdropFilter: 'blur(8px)',
                      animationDelay: `${index * 0.2}s`,
                    }}
                  >
                    <img
                      src={card.src}
                      alt={card.alt}
                      className={STYLES.cardImage}
                      loading="lazy"
                      srcSet={`${card.src} 1x, ${card.src} 2x`}
                      sizes="(max-width: 768px) 100vw, 50vw"
                      draggable="false"
                    />
                  </div>
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
