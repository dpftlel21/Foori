import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useBookings } from '../../../hooks/query/useGetBooking';
import { useUserInfo } from '../../../hooks/query/useGetUserInfo';
import PaymentModal from '../../storeDetail/reservationModal/PaymentModal';
import { BookingStatusBadge } from './BookingStatusBadge';

interface BookingModalProps {
  bookingId: number;
  isOpen: boolean;
  onClose: () => void;
}

const STYLES = {
  container: `
    fixed
    inset-0
    z-40
    flex
    items-center
    justify-center
  `,
  overlay: `
    absolute
    inset-0
    bg-black/40
    backdrop-blur-sm
  `,
  modal: `
    relative
    z-50
    bg-white
    rounded-2xl
    shadow-xl
    max-w-lg
    w-[95%]
    max-h-[90vh]
    overflow-auto
    m-4
  `,
  header: `
    sticky
    top-0
    bg-white
    px-6
    py-4
    border-b
    border-pink-100
    flex
    justify-between
    items-center
  `,
  headerTitle: `
    font-bold
    text-lg
    text-gray-900
  `,
  closeButton: `
    p-2
    hover:bg-pink-50
    rounded-full
    transition-colors
  `,
  closeIcon: `
    w-5
    h-5
    text-gray-500
  `,
  content: `p-6`,
  loadingSpinner: `
    flex
    justify-center
    items-center
    py-8
  `,
  spinner: `
    animate-spin
    rounded-full
    h-8
    w-8
    border-b-2
    border-pink-500
  `,
  bookingInfo: `space-y-6`,
  bookingHeader: `
    flex
    justify-between
    items-start
  `,
  restaurantName: `
    font-bold
    text-lg
    text-gray-900
  `,
  bookingDate: `
    text-sm
    text-gray-600
    mt-1
  `,
  detailsSection: `
    space-y-4
    bg-gray-50
    rounded-lg
    p-4
  `,
  detailRow: `
    flex
    justify-between
    text-sm
  `,
  detailLabel: `text-gray-600`,
  detailValue: `font-medium`,
  menuSection: `space-y-3`,
  menuTitle: `
    font-medium
    text-gray-900
  `,
  menuList: `
    bg-pink-50/50
    rounded-lg
    p-4
    space-y-2
  `,
  menuItem: `
    flex
    justify-between
    text-sm
  `,
  menuInfo: `
    flex
    items-center
    gap-2
  `,
  menuName: `text-gray-800`,
  menuQuantity: `text-gray-500`,
  menuPrice: `text-gray-800`,
  totalSection: `
    pt-2
    mt-2
    border-t
    border-pink-100
  `,
  totalRow: `
    flex
    justify-between
    items-center
    font-medium
  `,
  totalAmount: `
    text-lg
    text-pink-600
  `,
  buttonSection: `
    mt-6
    space-y-2
  `,
  cancelButton: `
    w-full
    px-4
    py-2
    border
    border-pink-200
    text-pink-600
    rounded-lg
    hover:bg-pink-50
    transition-colors
  `,
  paymentButton: `
    w-full
    px-4
    py-2
    bg-[#EE6677]
    text-white
    rounded-lg
    hover:bg-[#EE6677]/80
    transition-colors
  `,
} as const;

const BookingModal = ({ bookingId, isOpen, onClose }: BookingModalProps) => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const { bookingDetail, isLoading } = useBookings(bookingId);
  const userInfoQuery = useUserInfo();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div className={STYLES.container}>
            <motion.div
              className={STYLES.overlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />
            <motion.div
              className={STYLES.modal}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={STYLES.header}>
                <h3 className={STYLES.headerTitle}>예약 상세</h3>
                <button onClick={onClose} className={STYLES.closeButton}>
                  <svg
                    className={STYLES.closeIcon}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className={STYLES.content}>
                {isLoading ? (
                  <div className={STYLES.loadingSpinner}>
                    <div className={STYLES.spinner} />
                  </div>
                ) : (
                  bookingDetail && (
                    <div className={STYLES.bookingInfo}>
                      <div className={STYLES.bookingHeader}>
                        <div>
                          <h4 className={STYLES.restaurantName}>
                            {bookingDetail.restaurant.name}
                          </h4>
                          <p className={STYLES.bookingDate}>
                            {new Date(
                              bookingDetail.bookingDate,
                            ).toLocaleDateString('ko-KR', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}{' '}
                            {bookingDetail.bookingTime.substring(0, 5)}
                          </p>
                        </div>
                        <BookingStatusBadge status={bookingDetail.status} />
                      </div>

                      <div className={STYLES.detailsSection}>
                        <div className={STYLES.detailRow}>
                          <span className={STYLES.detailLabel}>예약 인원</span>
                          <span className={STYLES.detailValue}>
                            {bookingDetail.numOfPeople}명
                          </span>
                        </div>
                        <div className={STYLES.detailRow}>
                          <span className={STYLES.detailLabel}>예약 번호</span>
                          <span className={STYLES.detailValue}>
                            #{bookingDetail.id}
                          </span>
                        </div>
                      </div>

                      {bookingDetail.bookingMenus &&
                        bookingDetail.bookingMenus.length > 0 && (
                          <div className={STYLES.menuSection}>
                            <h5 className={STYLES.menuTitle}>주문 메뉴</h5>
                            <div className={STYLES.menuList}>
                              {bookingDetail.bookingMenus.map((item, index) => (
                                <div key={index} className={STYLES.menuItem}>
                                  <div className={STYLES.menuInfo}>
                                    <span className={STYLES.menuName}>
                                      {item.menu.name}
                                    </span>
                                    <span className={STYLES.menuQuantity}>
                                      x{item.quantity}
                                    </span>
                                  </div>
                                  <span className={STYLES.menuPrice}>
                                    {item.menu.price.toLocaleString()}원
                                  </span>
                                </div>
                              ))}
                              <div className={STYLES.totalSection}>
                                <div className={STYLES.totalRow}>
                                  <span>총 결제금액</span>
                                  <span className={STYLES.totalAmount}>
                                    {bookingDetail.totalPrice.toLocaleString()}
                                    원
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                      <div className={STYLES.buttonSection}>
                        {bookingDetail.status === 3 && (
                          <button
                            onClick={() => {
                              // 예약 취소
                            }}
                            className={STYLES.cancelButton}
                          >
                            예약 취소하기
                          </button>
                        )}

                        {bookingDetail.status === 1 && (
                          <button
                            onClick={() => setIsPaymentModalOpen(true)}
                            className={STYLES.paymentButton}
                          >
                            결제하기
                          </button>
                        )}
                      </div>
                    </div>
                  )
                )}
              </div>
            </motion.div>
          </div>

          {isPaymentModalOpen && bookingDetail && (
            <PaymentModal
              isOpen={isPaymentModalOpen}
              onClose={() => setIsPaymentModalOpen(false)}
              amount={bookingDetail.totalPrice}
              orderId={bookingDetail.orderId}
              orderName={`${bookingDetail.restaurant.name} 예약`}
              customerName={userInfoQuery.data?.name}
            />
          )}
        </>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;
