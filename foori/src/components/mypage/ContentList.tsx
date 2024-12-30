import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'; // 추가
import { useMyPage } from '../../contexts/MyPageContext';
import Consumption from './consumption/Consumption';
import EditProfile from './profile/EditProfile';
import ReservationStatus from './reservation/ReservationStatus';
import Review from './review/Review';

const ContentList = () => {
  const location = useLocation(); // 현재 경로 확인용
  const { currentTab, setCurrentTab } = useMyPage();
  const [content, setContent] = useState<string>('editProfile');

  useEffect(() => {
    // 직접 /mypage로 접근하거나 네비게이션 메뉴를 통해 접근할 때
    if (location.state?.from !== 'features') {
      setContent('editProfile');
      setCurrentTab('editProfile');
    }
    // FeaturesSection에서 넘어온 경우
    else if (currentTab === 'consumption' || currentTab === 'review') {
      setContent(currentTab);
    }
  }, [location, currentTab, setCurrentTab]);

  const ContentList =
    'w-[5vw] h-[3vh] flex justify-center text-center hover:bg-[#D87373] transition duration-500 ease-in-out';

  const Menu = [
    { id: 'editProfile', text: '프로필 수정' },
    { id: 'reservation', text: '예약 현황' },
    { id: 'consumption', text: '소비 분석' },
    { id: 'review', text: '내가 쓴 리뷰' },
  ];

  const List = {
    editProfile: <EditProfile />,
    reservation: <ReservationStatus />,
    consumption: <Consumption />,
    review: <Review />,
  };

  return (
    <div className="flex">
      <ul className="w-[7vw] h-[50vh] flex flex-col cursor-pointer shadow-lg border-r-2 border-solid border-[#EE6677]">
        {Menu.map((item) => (
          <li
            key={item.id}
            className={ContentList}
            onClick={() => {
              setContent(item.id);
              if (item.id === 'consumption' || item.id === 'review') {
                setCurrentTab(item.id as 'consumption' | 'review');
              }
            }}
          >
            {item.text}
          </li>
        ))}
      </ul>
      <div className="flex-1">{List[content as keyof typeof List]}</div>
    </div>
  );
};

export default ContentList;
