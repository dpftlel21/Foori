import { AnimatePresence, motion } from 'framer-motion';
import { useBookings } from '../../../hooks/query/useBooking';
import { BookingStatusBadge } from './BookingStatusBadge';

interface BookingModalProps {
  bookingId: number | null;
  isOpen: boolean;
  onClose: () => void;
}

const BookingModal = ({ bookingId, isOpen, onClose }: BookingModalProps) => {
  const { bookingDetail, isLoading } = useBookings(bookingId);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          />

          {/* modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed top-[12rem] left-[0.75rem] md:top-[16rem] md:left-[40rem] -translate-x-1/2 -translate-y-1/2 z-50
              bg-white rounded-2xl shadow-xl max-w-lg w-[95%] max-h-[90vh] overflow-auto"
          >
            {/* 모달 헤더 */}
            <div
              className="sticky top-0 bg-white px-6 py-4 border-b border-pink-100
              flex justify-between items-center"
            >
              <h3 className="font-bold text-lg text-gray-900">예약 상세</h3>
              <button
                onClick={onClose}
                className="p-2 hover:bg-pink-50 rounded-full transition-colors"
              >
                <svg
                  className="w-5 h-5 text-gray-500"
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

            {/* 모달 컨텐츠 */}
            <div className="p-6">
              {isLoading ? (
                <div className="flex justify-center items-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500" />
                </div>
              ) : (
                bookingDetail && (
                  <div className="space-y-6">
                    {/* 예약 정보 헤더 */}
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-lg text-gray-900">
                          {bookingDetail.restaurant.name}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
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

                    {/* 예약 상세 정보 */}
                    <div className="space-y-4 bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">예약 인원</span>
                        <span className="font-medium">
                          {bookingDetail.numOfPeople}명
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">예약 번호</span>
                        <span className="font-medium">#{bookingDetail.id}</span>
                      </div>
                    </div>

                    {/* 주문 메뉴 */}
                    {bookingDetail.bookingMenus &&
                      bookingDetail.bookingMenus.length > 0 && (
                        <div className="space-y-3">
                          <h5 className="font-medium text-gray-900">
                            주문 메뉴
                          </h5>
                          <div className="bg-pink-50/50 rounded-lg p-4 space-y-2">
                            {bookingDetail.bookingMenus.map((item, index) => (
                              <div
                                key={index}
                                className="flex justify-between text-sm"
                              >
                                <div className="flex items-center gap-2">
                                  <span className="text-gray-800">
                                    {item.menu.name}
                                  </span>
                                  <span className="text-gray-500">
                                    x{item.quantity}
                                  </span>
                                </div>
                                <span className="text-gray-800">
                                  {item.menu.price.toLocaleString()}원
                                </span>
                              </div>
                            ))}
                            <div className="pt-2 mt-2 border-t border-pink-100">
                              <div className="flex justify-between font-medium">
                                <span>총 결제금액</span>
                                <span className="text-pink-600">
                                  {bookingDetail.totalPrice.toLocaleString()}원
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                    {/* 예약 취소 버튼 (상태가 예약 완료일 때만 표시) */}
                    {bookingDetail.status === 1 && (
                      <div className="pt-4">
                        <button
                          onClick={() => {
                            // 예약 취소
                          }}
                          className="w-full py-3 px-4 bg-red-50 text-red-600 rounded-lg
                          hover:bg-red-100 transition-colors font-medium"
                        >
                          예약 취소하기
                        </button>
                      </div>
                    )}
                  </div>
                )
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;
