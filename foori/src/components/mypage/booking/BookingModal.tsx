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
  overlay: `
    fixed
    inset-0
    bg-black/40
    backdrop-blur-sm
    z-40
  `,
  modal: `
    fixed
    top-[12rem]
    left-[0.75rem]
    md:top-[18rem]
    md:left-[10rem]
    lg:top-[16rem]
    lg:left-[40rem]
    -translate-x-1/2
    -translate-y-1/2
    z-50
    bg-white
    rounded-2xl
    shadow-xl
    max-w-lg
    w-[95%]
    max-h-[90vh]
    overflow-auto
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
    font-medium
  `,
  totalAmount: `text-pink-600`,
  buttonSection: `
    pt-4
    space-y-2
  `,
  cancelButton: `
    w-full
    py-3
    px-4
    bg-red-50
    text-red-600
    rounded-lg
    hover:bg-red-100
    transition-colors
    font-medium
  `,
  paymentButton: `
    w-full
    py-3
    px-4
    bg-[#e38994fb]
    text-white
    rounded-lg
    hover:bg-[#d27883fb]
    transition-colors
    font-medium
  `,
} as const;

const BookingModal = ({ bookingId, isOpen, onClose }: BookingModalProps) => {
  const { bookingDetail, isLoading } = useBookings(bookingId);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const userInfoQuery = useUserInfo();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className={STYLES.overlay}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={STYLES.modal}
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
                                  {bookingDetail.totalPrice.toLocaleString()}원
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
