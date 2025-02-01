import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleReservation } from '../../../api/endpoints/reservation';
import { useToast } from '../../../contexts/ToastContext';
import { useUserInfo } from '../../../hooks/query/useUserInfo';
import { useReservationValidation } from '../../../hooks/reservation/useReservationValidation';
import Calendar from './Calendar';
import InfoTooltip from './InfoTooltip';
import PaymentModal from './PaymentModal';
import ReservationInfo from './ReservationInfo';
import ReservationMenu from './ReservationMenu';

/**
 * ReservationModal Props 인터페이스
 */
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
    openDays: string;
    menus: [
      {
        id: number;
        name: string;
        price: number;
      },
    ];
  };
}

/**
 * 예약 모달 컴포넌트
 */
const ReservationModal = ({
  isOpen,
  onClose,
  placeInfo,
}: ReservationModalProps) => {
  // 상태 관리
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);
  const [selectedMembers, setSelectedMembers] = useState<number>(1);
  const [selectedMenus, setSelectedMenus] = useState<{
    [key: number]: number;
  }>({});
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState<boolean>(false);
  const [orderId, setOrderId] = useState<string>('');

  // 훅 사용
  const userInfoQuery = useUserInfo();
  const { validateReservation } = useReservationValidation();
  const { showToast } = useToast();
  const navigate = useNavigate();

  // 모달이 닫혀있으면 렌더링하지 않음
  if (!isOpen) return null;

  console.log('placeInfo', placeInfo);

  /**
   * 스타일 정의
   */
  const MODAL_STYLES = {
    container: `
    fixed inset-0
    bg-black bg-opacity-50
    flex items-center justify-center
    z-50
    p-4
  `,
    modal: `
    bg-white
    rounded-lg
    w-full
    max-w-[1200px]
    min-h-[700px]
    max-h-[90vh]
    flex
    flex-col
    border-2
    border-solid
    border-[#EE6677]
  `,
    header: `
    flex
    items-center
    justify-end
    p-6
    border-b
    border-solid
    border-[#e5e0e090]
  `,
    closeButton: `
    text-2xl
    text-gray-500
    hover:text-gray-700
    transition-colors
  `,
    content: `
    flex-1
    overflow-y-auto
    p-8
    grid
    grid-cols-1
    md:grid-cols-[1fr_1fr]
    gap-12
  `,
    leftSection: `
    flex
    flex-col
    items-center
  `,
    rightSection: `
    flex
    flex-col
    gap-8
    relative
  `,
    infoSection: `
    absolute
    top-0
    right-0
  `,
    bookingButton: `
    w-full
    bg-[#e38994fb]
    text-white
    py-4
    rounded-lg
    hover:bg-[#d27883fb]
    transition-colors
    mt-auto
    text-lg
    font-medium
  `,
  } as const;

  /**
   * 예약 처리 함수
   * @param amount 결제 금액
   */
  const handleBooking = async (amount: number) => {
    // 예약 유효성 검사
    const isValid = validateReservation({
      selectedDate,
      selectedTime,
      openTime: placeInfo.openTime,
      closeTime: placeInfo.closeTime,
      openDays: placeInfo.openDays,
      selectedMembers,
      maxCapacity: 8, // 매장별로 다르게 설정 가능
    });

    if (!isValid) return;

    // 예약 데이터 생성
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
      // 예약 API 호출
      const response = await handleReservation(bookingData);
      console.log('예약 response', response);
      if (response.status === 1) {
        const isConfirmed = window.confirm(
          '예약 마감 하루 전까지 미결제시 자동 취소됩니다. 지금 결제하시겠습니까?',
        );

        if (isConfirmed) {
          setOrderId(response.orderId);
          setIsPaymentModalOpen(true);
        } else {
          showToast(
            '예약 마감 하루 전까지 미결제시 자동 취소됩니다.',
            'warning',
          );
          navigate('/mypage');
          onClose();
        }
      }
    } catch (error) {
      console.error('예약 에러:', error);
      showToast('예약 중 오류가 발생했습니다.', 'error');
    }
  };

  return (
    <div className={MODAL_STYLES.container}>
      <div className={MODAL_STYLES.modal}>
        <div className={MODAL_STYLES.header}>
          <button onClick={onClose}>✕</button>
        </div>
        <div className={MODAL_STYLES.content}>
          {/* 왼쪽: 캘린더 */}
          <Calendar
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            openDays={placeInfo.openDays}
          />

          {/* 오른쪽: 예약 정보, 구성원, 메뉴판 */}
          <div className={MODAL_STYLES.rightSection}>
            {/* 안내사항 아이콘 */}
            <div className={MODAL_STYLES.infoSection}>
              <InfoTooltip />
            </div>

            {/* 예약 시간 & 구성원 */}
            <ReservationInfo
              openTime={placeInfo.openTime}
              closeTime={placeInfo.closeTime}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
              selectedMembers={selectedMembers}
              setSelectedMembers={setSelectedMembers}
            />

            {/* 메뉴판 */}
            <ReservationMenu
              menus={placeInfo.menus}
              selectedMenus={selectedMenus}
              setSelectedMenus={setSelectedMenus}
              setTotalAmount={setTotalAmount}
              handleBooking={handleBooking}
            />
          </div>
        </div>

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
    </div>
  );
};

export default ReservationModal;
