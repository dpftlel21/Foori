import { AnimatePresence, motion } from 'framer-motion';
import { BookingListResponse } from '../../../hooks/useBooking';
import BookingDetail from './BookingDetail';

interface BookingItemProps {
  booking: BookingListResponse;
  isExpanded: boolean;
  onToggle: () => void;
}

const BookingStatusBadge = ({ status }: { status: number }) => {
  const statusConfig = {
    0: { text: '예약 대기', color: 'bg-yellow-100 text-yellow-800' },
    1: { text: '예약 완료', color: 'bg-green-100 text-green-800' },
    2: { text: '예약 취소', color: 'bg-red-100 text-red-800' },
  };

  const config =
    statusConfig[status as keyof typeof statusConfig] || statusConfig[0];

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${config.color}`}
    >
      {config.text}
    </span>
  );
};

const BookingItem = ({ booking, isExpanded, onToggle }: BookingItemProps) => {
  // 날짜와 시간 포맷팅
  const formattedDate = booking.bookingDate.split(' ')[0];
  const formattedTime = booking.bookingTime.substring(0, 5); // "HH:mm" 형식으로 자르기

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#fee9e9b7] rounded-lg shadow-sm hover:shadow transition-all duration-200"
    >
      <div
        className="p-4 sm:p-5 cursor-pointer hover:bg-pink-50/50 transition-colors border border-pink-100 rounded-lg"
        onClick={onToggle}
      >
        <div className="flex justify-between items-start gap-3">
          <div className="space-y-3 flex-1 min-w-0">
            {/* 레스토랑 이름 & 상태 배지 */}
            <div className="flex items-center justify-between border-b border-pink-100/50 pb-3">
              <h3 className="text-base sm:text-lg font-bold text-gray-800 truncate">
                {booking.restaurant.name}
              </h3>
              <BookingStatusBadge status={booking.status} />
            </div>

            {/* 예약 정보 그리드 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-gray-600 bg-white p-3 rounded-lg">
              <div className="flex items-center gap-1.5">
                <svg
                  className="w-3.5 h-3.5 text-pink-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span>
                  {formattedDate} {formattedTime}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <svg
                  className="w-3.5 h-3.5 text-pink-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span>{booking.numOfPeople}명</span>
              </div>
              <div className="flex items-center gap-1.5 col-span-full">
                <svg
                  className="w-3.5 h-3.5 text-pink-500 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="truncate">{booking.restaurant.address}</span>
              </div>
            </div>
          </div>

          {/* 확장 버튼 */}
          <motion.button
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-pink-500 hover:text-pink-600 bg-pink-50 p-1.5 rounded-full flex-shrink-0"
            aria-label={isExpanded ? '접기' : '펼치기'}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <BookingDetail bookingId={booking.id} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default BookingItem;
