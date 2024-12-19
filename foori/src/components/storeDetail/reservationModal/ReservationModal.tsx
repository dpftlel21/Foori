import Calendar from './Calendar';
import ReservationDetail from './ReservationDetail';
import ReservationMenu from './ReservationMenu';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  placeInfo: {
    name: string;
    category: string;
    rating_avg: number;
    address: string;
    openTime: string;
    closeTime: string;
    menus: [
      {
        name: string;
        price: number;
      },
    ];
  };
}

const ReservationModal = ({
  isOpen,
  onClose,
  placeInfo,
}: ReservationModalProps) => {
  if (!isOpen) return null;

  const ReservationContainer =
    'w-[95%] md:w-[80%] h-[90%] md:h-[73.9%] flex flex-col justify-start gap-4 mt-[2%] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-xl border-2 border-solid border-[#EE6677] z-50 p-4';

  const TopSection =
    'w-full flex flex-col md:flex-row justify-between items-start md:items-center';

  const StoreInfoSection =
    'w-full flex flex-col md:flex-row items-start md:items-center gap-2';

  const AddressSection =
    'w-full mt-2 md:mt-4 border-b-2 border-solid border-[#e3899430] pb-4';

  const CalendarSection =
    'w-full h-[55%] flex flex-col md:flex-row justify-between gap-4 mt-2 border-b-2 border-solid border-[#e3899430]';

  return (
    <div className={ReservationContainer}>
      {/* 가게명, 평점, 돌아가기 버튼 */}
      <div className={TopSection}>
        <div className={StoreInfoSection}>
          <h1 className="text-lg md:text-xl font-bold border-b-2 border-solid border-[#e38994fb]">
            {placeInfo.name}
          </h1>
          <span className="text-sm md:text-base md:ml-4">
            평점 : {placeInfo.rating_avg} / 5.0
          </span>
        </div>
        <button
          className="w-[100px] md:w-[120px] h-[35px] md:h-[40px] bg-[#FF800B] text-white rounded-md hover:bg-[#fcb69f] transition duration-500 ease-in-out font-bold mt-4 md:mt-0"
          onClick={onClose}
        >
          돌아가기
        </button>
      </div>

      {/* 가게 주소 */}
      <div className={AddressSection}>
        <h1 className="text-sm md:text-base">
          가게 주소 : {placeInfo.address}
        </h1>
      </div>

      {/* 캘린더와 예약 상세 */}
      <div className={CalendarSection}>
        <Calendar />
        <ReservationDetail
          openTime={placeInfo.openTime}
          closeTime={placeInfo.closeTime}
        />
      </div>

      {/* 메뉴 컴포넌트 */}
      <ReservationMenu menus={placeInfo.menus} />
    </div>
  );
};

export default ReservationModal;