import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleReservation } from '../../../api/endpoints/reservation';
import { useToast } from '../../../contexts/ToastContext';
import { useUserInfo } from '../../../hooks/query/useUserInfo';
import { useReservationValidation } from '../../../hooks/reservation/useReservationValidation';
import Calendar from './Calendar';
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
  const { validateReservation, ERROR_STYLES } = useReservationValidation();
  const { showToast } = useToast();
  const navigate = useNavigate();

  // 모달이 닫혀있으면 렌더링하지 않음
  if (!isOpen) return null;

  console.log('placeInfo', placeInfo);

  /**
   * 스타일 정의
   */
  const MODAL_STYLES = {
    // 컨테이너 스타일
    container: `
      fixed inset-0
      bg-black bg-opacity-50
      flex items-center justify-center
      z-50
      p-4
    `,
    // 모달 스타일
    modal: `
      bg-white
      rounded-lg p-6
      w-full
      max-w-[1200px]
      h-[600px]
      md:h-[750px]
      mt-6
      overflow-y-auto
      border-2
      border-solid
      border-[#EE6677]
      rounded-lg
      shadow-sm
    `,
    // 헤더 섹션 스타일
    header: {
      container: `
        flex flex-col md:flex-row
        justify-between items-start md:items-center
        mb-6 pb-4
        border-b border-gray-200
      `,
      storeInfoSection: `
        flex flex-col md:flex-row
        items-start md:items-center
        gap-2 md:gap-4
      `,
      title: `
        text-xl md:text-2xl
        font-bold
        text-gray-800
      `,
      rating: `
        text-sm md:text-base
        text-gray-600
      `,
      address: `
        text-sm md:text-base
        text-gray-500
        mt-1 md:mt-0
      `,
    },
    // 컨텐츠 섹션 스타일
    content: `
      space-y-6
      h-[calc(100dvh-600px)]
    `,
    // 에러/경고 메시지 스타일
    message: {
      error: ERROR_STYLES.errorMessage,
      warning: ERROR_STYLES.warningMessage,
    },
    // 버튼 스타일
    button: {
      primary: `
        bg-[#e38994] text-white
        px-6 py-2
        rounded-lg
        hover:bg-[#d27883]
        transition-colors
      `,
      disabled: `
        bg-gray-300 text-gray-500
        px-6 py-2
        rounded-lg
        cursor-not-allowed
      `,
    },
  } as const;

  /**
   * 예약 처리 함수
   * @param amount 결제 금액
   */
  const handleBooking = async (amount: number) => {
    // 로그인 체크
    if (!userInfoQuery.data) {
      showToast('로그인이 필요한 서비스입니다.', 'warning');
      navigate('/login');
      return;
    }

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

      if (response.ok) {
        const bookingResponse = await response.json();
        const isConfirmed = window.confirm(
          '예약 마감 하루 전까지 미결제시 자동 취소됩니다. 지금 결제하시겠습니까?',
        );

        if (isConfirmed) {
          setOrderId(bookingResponse.orderId);
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
        {/* 헤더 섹션 */}
        <div className={MODAL_STYLES.header.container}>
          <div className={MODAL_STYLES.header.storeInfoSection}>
            <h1 className={MODAL_STYLES.header.title}>{placeInfo.name}</h1>
            <span className={MODAL_STYLES.header.rating}>
              평점: {placeInfo.rating_avg} / 5.0
            </span>
            <span className={MODAL_STYLES.header.address}>
              {placeInfo.address}
            </span>
          </div>
          <button onClick={onClose} className={MODAL_STYLES.button.primary}>
            닫기
          </button>
        </div>

        {/* 컨텐츠 섹션 */}
        <div className={MODAL_STYLES.content}>
          {/* 캘린더와 예약 정보 */}
          <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-6">
            <Calendar
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              openDays={placeInfo.openDays}
            />
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
          </div>

          {/* 메뉴 선택 섹션 */}
          <ReservationMenu
            menus={placeInfo.menus}
            selectedMenus={selectedMenus}
            setSelectedMenus={setSelectedMenus}
            setTotalAmount={setTotalAmount}
            handleBooking={handleBooking}
          />
        </div>

        {/* 결제 모달 */}
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
