import { lazy, Suspense, useState } from 'react';
import { useMyPage } from '../../contexts/MyPageContext';
import LoadingSpinner from '../common/LoadingSpinner';

const STYLES = {
  wrapper: `
    flex
    flex-col
    md:flex-row
    h-full
  `,
  nav: `
    lg:w-[10%]
    md:w-[20%]
    md:border-r
    md:border-[#EE6677]
  `,
  tabList: `
    grid
    grid-cols-4
    gap-1
    p-4
    bg-gray-50
    md:flex
    md:flex-col
    md:bg-transparent
    md:gap-2
  `,
  tab: `
    flex
    flex-col
    md:flex-row
    items-center
    md:items-center
    justify-center
    p-4
    rounded-2xl
    md:rounded-lg
    transition-colors
    duration-200
    md:gap-3
  `,
  tabActive: `
    bg-[#EE6677]
    text-white
    md:bg-pink-50
    md:text-pink-600
  `,
  tabInactive: `
    bg-white
    text-gray-600
    md:hover:bg-gray-50
  `,
  icon: `
    text-xl
    mb-2
    md:mb-0
    md:text-base
  `,
  text: `
    text-sm
    whitespace-nowrap
  `,
} as const;

const ContentList = () => {
  const { currentTab, setCurrentTab } = useMyPage();
  const [content, setContent] = useState<string>('editProfile');
  //Lazy
  const BookingCalendar = lazy(() => import('./booking/BookingCalendar'));
  const Consumption = lazy(() => import('./consumption/Consumption'));
  const EditProfile = lazy(() => import('./profile/EditProfile'));
  const Review = lazy(() => import('./review/Review'));

  const Menu = [
    {
      id: 'editProfile',
      text: '프로필 수정',
      icon: '👤',
    },
    {
      id: 'booking',
      text: '예약 현황',
      icon: '📅',
    },
    {
      id: 'consumption',
      text: '소비 분석',
      icon: '📊',
    },
    {
      id: 'review',
      text: '내가 쓴 리뷰',
      icon: '✍️',
    },
  ];

  const List = {
    editProfile: (
      <Suspense fallback={<LoadingSpinner />}>
        <EditProfile />
      </Suspense>
    ),
    booking: (
      <Suspense fallback={<LoadingSpinner />}>
        <BookingCalendar />
      </Suspense>
    ),
    consumption: (
      <Suspense fallback={<LoadingSpinner />}>
        <Consumption />
      </Suspense>
    ),
    review: (
      <Suspense fallback={<LoadingSpinner />}>
        <Review />
      </Suspense>
    ),
  };

  return (
    <div className={STYLES.wrapper}>
      <nav className={STYLES.nav}>
        <div className={STYLES.tabList}>
          {Menu.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setContent(item.id);
                if (item.id === 'consumption' || item.id === 'review') {
                  setCurrentTab(item.id as 'consumption' | 'review');
                }
              }}
              className={`${STYLES.tab} ${
                content === item.id ? STYLES.tabActive : STYLES.tabInactive
              }`}
            >
              <span className={STYLES.icon}>{item.icon}</span>
              <span className={STYLES.text}>{item.text}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* 컨텐츠 영역 */}
      {List[content as keyof typeof List]}
    </div>
  );
};

export default ContentList;
