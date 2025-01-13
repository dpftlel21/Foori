import { useState } from 'react';
import { useAuth } from '../../../api/auth';
import { handleReservation } from '../../../api/reservation';
import { useToast } from '../../../contexts/ToastContext';
import Calendar from './Calendar';
import PaymentModal from './PaymentModal';
import ReservationDetail from './ReservationDetail';
import ReservationMenu from './ReservationMenu';
interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  placeInfo: {
    id: number;
    name: string;
    category: string;
    rating_avg: number;
    address: string;
    openTime: string;
    closeTime: string;
    menus: [
      {
        id: number;
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
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);
  const [selectedMembers, setSelectedMembers] = useState<number>(1);
  const [selectedMenus, setSelectedMenus] = useState<{
    [key: number]: number;
  }>({});
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState<boolean>(false);

  const { userInfoQuery } = useAuth();
  const { showToast } = useToast();
  if (!isOpen) return null;

  const orderId = `ORDER_${Date.now()}_${placeInfo.id}_${Math.random()
    .toString(36)
    .substring(2, 8)}`;

  const ReservationContainer =
    'w-[95%] md:w-[80%] h-[90%] md:h-[75.4%] flex flex-col justify-start gap-4 mt-[2%] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-xl border-2 border-solid border-[#EE6677] z-50 p-4';

  const TopSection =
    'w-full flex flex-col md:flex-row justify-between items-start md:items-center';

  const StoreInfoSection =
    'w-full flex flex-col md:flex-row items-start md:items-center gap-2';

  const AddressSection =
    'w-full mt-2 md:mt-4 border-b-2 border-solid border-[#e3899430] pb-4';

  const CalendarSection =
    'w-full h-[55%] flex flex-col md:flex-row justify-between gap-4 mt-2 border-b-2 border-solid border-[#e3899430]';

  const handleBooking = async (amount: number) => {
    if (!selectedDate || !selectedTime) {
      alert('날짜와 시간을 선택해주세요.');
      return;
    }

    if (Object.keys(selectedMenus).length === 0) {
      alert('메뉴를 선택해주세요.');
      return;
    }

    // amount 상태 업데이트를 먼저 해줍니다
    setTotalAmount(amount);

    // 날짜와 시간을 합친 새로운 Date 객체 생성
    const bookingData = {
      bookingDateTime: new Date(
        `${selectedDate.toISOString().split('T')[0]}T${selectedTime
          .getHours()
          .toString()
          .padStart(2, '0')}:00:00+09:00`,
      ),
      numOfPeople: selectedMembers,
      restaurant: { restaurantId: placeInfo.id },
      bookingMenus: Object.entries(selectedMenus).map(([menuId, quantity]) => ({
        menuId: Number(menuId),
        quantity,
      })),
    };

    try {
      const response = await handleReservation(bookingData);
      if (response.ok) {
        setIsPaymentModalOpen(true);
      } else {
        showToast('예약에 실패했습니다.', 'error');
      }
    } catch (error) {
      console.error('예약 에러:', error);
      showToast('예약 중 오류가 발생했습니다.', 'error');
    }
  };

  return (
    <div className={ReservationContainer}>
      {/* 가게명, 평점 */}
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
        <Calendar
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
        <ReservationDetail
          openTime={placeInfo.openTime}
          closeTime={placeInfo.closeTime}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
          selectedMembers={selectedMembers}
          setSelectedMembers={setSelectedMembers}
        />
      </div>

      {/* 메뉴 컴포넌트 */}
      <ReservationMenu
        menus={placeInfo.menus}
        selectedMenus={selectedMenus}
        setSelectedMenus={setSelectedMenus}
        setTotalAmount={setTotalAmount}
        handleBooking={handleBooking}
      />

      {/* 결제 모달은 isPaymentModalOpen이 true일 때만 렌더링 */}
      {isPaymentModalOpen && (
        <PaymentModal
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          amount={totalAmount}
          orderId={orderId}
          orderName={`${placeInfo.name} 예약`}
          customerName={userInfoQuery.data?.name}
        />
      )}
    </div>
  );
};

export default ReservationModal;
