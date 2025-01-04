import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useMyPage } from '../../contexts/MyPageContext';
import BookingCalendar from './booking/BookingCalendar';
import Consumption from './consumption/Consumption';
import EditProfile from './profile/EditProfile';
import Review from './review/Review';

const ContentList = () => {
  const location = useLocation();
  const { currentTab, setCurrentTab } = useMyPage();
  const [content, setContent] = useState<string>('editProfile');

  useEffect(() => {
    if (location.state?.from !== 'features') {
      setContent('editProfile');
      setCurrentTab('editProfile');
    } else if (currentTab === 'consumption' || currentTab === 'review') {
      setContent(currentTab);
    }
  }, [location, currentTab, setCurrentTab]);

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
    <div className="w-[93%] flex flex-start h-full">
      {/* 사이드 메뉴 */}
      <div className="w-[15%] flex flex-col flex-start items-center p-2 border-r-2 border-solid border-[#EE6677]">
        <div className="p-6">
          <nav className="space-y-1">
            {Menu.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setContent(item.id);
                  if (item.id === 'consumption' || item.id === 'review') {
                    setCurrentTab(item.id as 'consumption' | 'review');
                  }
                }}
                className={`w-full px-4 py-3 flex items-center gap-3 rounded-lg transition-colors duration-200
                  ${
                    content === item.id
                      ? 'bg-pink-50 text-pink-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium">{item.text}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* 컨텐츠 영역 */}
      <div className="w-[85%] flex flex-col flex-start overflow-auto">
        {List[content as keyof typeof List]}
      </div>
    </div>
  );
};

export default ContentList;
