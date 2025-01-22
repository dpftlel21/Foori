import { useState } from 'react';
import { useMyPage } from '../../contexts/MyPageContext';
import BookingCalendar from './booking/BookingCalendar';
import Consumption from './consumption/Consumption';
import EditProfile from './profile/EditProfile';
import Review from './review/Review';

const ContentList = () => {
  const { currentTab, setCurrentTab } = useMyPage();
  const [content, setContent] = useState<string>('editProfile');

  const STYLES = {
    wrapper: 'flex flex-col md:flex-row h-full',
    // 모바일: 가로 탭 / PC: 세로 사이드바
    nav: 'md:w-64 md:border-r md:border-[#EE6677]',
    // 모바일 탭 스타일
    mobileTabList: 'grid grid-cols-4 gap-1 p-4 bg-gray-50 md:hidden',
    mobileTab:
      'flex flex-col items-center justify-center p-4 rounded-2xl transition-colors duration-200',
    mobileTabActive: 'bg-[#EE6677] text-white',
    mobileTabInactive: 'bg-white text-gray-600',
    tabIcon: 'text-xl mb-2',
    tabText: 'text-sm whitespace-nowrap',
    // PC 세로 탭 스타일
    desktopTabList: 'hidden md:flex md:flex-col p-4 space-y-2',
    desktopTab:
      'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200',
    desktopTabActive: 'bg-pink-50 text-pink-600',
    desktopTabInactive: 'text-gray-600 hover:bg-gray-50',
  } as const;

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
    editProfile: <EditProfile />,
    booking: <BookingCalendar />,
    consumption: <Consumption />,
    review: <Review />,
  };

  return (
    <div className={STYLES.wrapper}>
      <nav className={STYLES.nav}>
        {/* 모바일 가로 탭 */}
        <div className={STYLES.mobileTabList}>
          {Menu.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setContent(item.id);
                if (item.id === 'consumption' || item.id === 'review') {
                  setCurrentTab(item.id as 'consumption' | 'review');
                }
              }}
              className={`${STYLES.mobileTab} ${
                content === item.id
                  ? STYLES.mobileTabActive
                  : STYLES.mobileTabInactive
              }`}
            >
              <span className={STYLES.tabIcon}>{item.icon}</span>
              <span className={STYLES.tabText}>{item.text}</span>
            </button>
          ))}
        </div>

        {/* PC 세로 탭 */}
        <div className={STYLES.desktopTabList}>
          {Menu.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setContent(item.id);
                if (item.id === 'consumption' || item.id === 'review') {
                  setCurrentTab(item.id as 'consumption' | 'review');
                }
              }}
              className={`${STYLES.desktopTab} ${
                content === item.id
                  ? STYLES.desktopTabActive
                  : STYLES.desktopTabInactive
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.text}</span>
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
