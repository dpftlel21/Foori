import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleReservation } from '../../../api/endpoints/reservation';
import { useToast } from '../../../contexts/ToastContext';
import { useUserInfo } from '../../../hooks/query/useGetUserInfo';
import { useReservationValidation } from '../../../hooks/reservation/useReservationValidation';
import Calendar from './Calendar';
import InfoTooltip from './InfoTooltip';
import PaymentModal from './PaymentModal';
import ReservationInfo from './ReservationInfo';
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

const MODAL_STYLES = {
  container: `
    fixed inset-0
    bg-black bg-opacity-50
    z-50
    flex
    justify-center
    items-center
  `,
  modal: `
    bg-white
    rounded-lg
    w-full
    max-w-[1200px]
    md:min-h-[700px]
    max-h-[820px]
    flex
    flex-col
    md:mt-20
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
} as const;

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
  const [orderId, setOrderId] = useState<string>('');

  const userInfoQuery = useUserInfo();
  const { validateReservation } = useReservationValidation();
  const { showToast } = useToast();
  const navigate = useNavigate();

  // 애니메이션 variants
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.3 },
    },
  };

  const modalVariants = {
    hidden: {
      scale: 0.8,
      opacity: 0,
      y: 50,
    },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 25,
      },
    },
    exit: {
      scale: 0.8,
      opacity: 0,
      y: 50,
      transition: {
        duration: 0.2,
      },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.2,
        duration: 0.3,
      },
    },
  };

  const handleBooking = async (amount: number) => {
    const isValid = validateReservation({
      selectedDate,
      selectedTime,
      openTime: placeInfo.openTime,
      closeTime: placeInfo.closeTime,
      openDays: placeInfo.openDays,
      selectedMembers,
      maxCapacity: 8,
    });

    if (!isValid) return;

    // 한국 시간으로 예약 시간 생성
    if (!selectedDate || !selectedTime) return;

    // 선택된 날짜와 시간을 결합하여 새로운 Date 객체 생성
    const bookingDateTime = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      selectedTime.getHours(),
      0, // 분
      0, // 초
      0, // 밀리초
    );

    // UTC+9 오프셋 적용
    const koreanOffset = 9 * 60; // 9시간을 분으로 변환
    const userOffset = bookingDateTime.getTimezoneOffset(); // 현재 시스템의 오프셋
    const offsetDiff = koreanOffset + userOffset; // 보정해야 할 시간 차이
    bookingDateTime.setMinutes(bookingDateTime.getMinutes() + offsetDiff);

    const bookingData = {
      bookingDateTime,
      numOfPeople: selectedMembers,
      restaurant: { restaurantId: placeInfo.id },
      bookingMenus: Object.entries(selectedMenus).map(([menuId, quantity]) => ({
        menuId: Number(menuId),
        quantity,
      })),
    };

    try {
      const response = await handleReservation(bookingData);
      console.log('bookingData', response);
      if (response.status === 1) {
        const isConfirmed = window.confirm(
          '예약 마감 하루 전까지 미결제시 자동 취소됩니다. 지금 결제하시겠습니까?',
        );

        if (isConfirmed) {
          setOrderId(response.orderId);
          setTotalAmount(amount);
          setIsPaymentModalOpen(true);
        } else {
          navigate('/mypage');
          onClose();
        }
      }
    } catch (error) {
      console.error('예약 에러:', error);
      showToast('예약 중 오류가 발생했습니다.', 'error');
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className={MODAL_STYLES.container}
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={onClose}
      >
        <motion.div
          className={MODAL_STYLES.modal}
          variants={modalVariants}
          onClick={(e) => e.stopPropagation()}
        >
          <motion.div
            className={MODAL_STYLES.header}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <motion.button
              onClick={onClose}
              className={MODAL_STYLES.closeButton}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              ✕
            </motion.button>
          </motion.div>

          <motion.div
            className={MODAL_STYLES.content}
            variants={contentVariants}
          >
            {/* 왼쪽: 캘린더 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Calendar
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                openDays={placeInfo.openDays}
              />
            </motion.div>

            {/* 오른쪽: 예약 정보, 구성원, 메뉴판 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col gap-8 relative"
            >
              <div className="absolute top-0 right-0">
                <InfoTooltip />
              </div>

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

              <ReservationMenu
                menus={placeInfo.menus}
                selectedMenus={selectedMenus}
                setSelectedMenus={setSelectedMenus}
                setTotalAmount={setTotalAmount}
                handleBooking={handleBooking}
              />
            </motion.div>
          </motion.div>
        </motion.div>

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
      </motion.div>
    </AnimatePresence>
  );
};

export default ReservationModal;
