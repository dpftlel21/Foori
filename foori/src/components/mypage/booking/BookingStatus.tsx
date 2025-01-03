import { useState } from 'react';
import { BookingListResponse, useBookings } from '../../../hooks/useBooking';
import MenuContainer from '../../common/MenuContainer';
import BookingItem from './BookingItem';

const BookingStatus = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(2); // 초기에 5개 표시
  const { bookings, isLoading, error } = useBookings();

  const showMoreItems = () => {
    setVisibleCount((prev) => prev + 2); // 5개씩 추가
  };

  return (
    <MenuContainer>
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* 스크롤 가능한 컨테이너 */}
        <div className="relative">
          <div className="space-y-3 max-h-[calc(100vh-240px)] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-pink-200 scrollbar-track-transparent">
            {bookings
              ?.slice(0, visibleCount)
              .map((booking: BookingListResponse) => (
                <BookingItem
                  key={booking.id}
                  booking={booking}
                  isExpanded={expandedId === booking.id}
                  onToggle={() => {
                    if (expandedId === booking.id) {
                      setExpandedId(null);
                    } else {
                      setExpandedId(booking.id);
                    }
                  }}
                />
              ))}

            {/* 더보기 버튼 */}
            {bookings && visibleCount < bookings.length && (
              <div className="sticky bottom-0 pt-4 pb-2 bg-gradient-to-t from-white via-white">
                <button
                  onClick={showMoreItems}
                  className="w-full px-4 py-2.5 bg-pink-50 text-pink-600 rounded-lg hover:bg-pink-100 transition-colors duration-200 text-sm font-medium"
                >
                  더보기 ({visibleCount}/{bookings.length})
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 예약 내역이 없는 경우 */}
        {!bookings?.length && (
          <div className="text-center py-10 text-gray-500 bg-pink-50/30 rounded-lg">
            예약 내역이 없습니다.
          </div>
        )}
      </div>
    </MenuContainer>
  );
};

export default BookingStatus;
