import { useState } from 'react';
import { useBookings } from '../../../hooks/query/useGetBooking';
import BookingModal from './BookingModal';
import { BookingStatusConfig } from './BookingStatusConfig';

const STYLES = {
  container: `
    w-full
    max-w-[1400px]
    flex
    flex-col
    gap-4
    p-4
  `,
  legend: `
    flex
    flex-wrap
    gap-3
    p-3
    bg-white
    rounded-lg
    shadow-sm
  `,
  calendar: `
    h-[350px]
    md:h-[calc(100dvh-34rem)]
    lg:h-[calc(100dvh-20rem)]
    overflow-y-auto
    md:overflow-y-hidden
    bg-white
    rounded-lg
    shadow-sm
    p-6
    border
    border-gray-100
  `,
  header: `
    flex
    items-center
    justify-between
    mb-6
  `,
  monthTitle: `
    text-xl
    font-bold
    text-gray-800
  `,
  navButton: `
    w-8
    h-8
    flex
    items-center
    justify-center
    text-gray-600
    hover:bg-gray-100
    rounded-full
    transition-colors
  `,
  weekdays: `
    grid
    grid-cols-7
    mb-4
  `,
  weekday: (dayIndex: number) => `
    text-center
    text-sm
    font-medium
    ${
      dayIndex === 0
        ? 'text-red-500'
        : dayIndex === 6
        ? 'text-blue-500'
        : 'text-gray-600'
    }
    py-2
  `,
  days: `
    grid
    grid-cols-7
    gap-2
  `,
  day: (
    isSelected: boolean,
    isToday: boolean,
    hasBooking: boolean,
    dayIndex: number,
    isCurrentMonth: boolean,
  ) => `
    aspect-[5/2]
    md:aspect-[2/3]
    lg:aspect-[5/2]
    relative
    p-2
    flex
    flex-col
    gap-1
    ${
      isSelected
        ? 'bg-[#e38994fb] text-white'
        : isToday
        ? 'bg-[#e3899420]'
        : 'bg-transparent'
    }
    ${
      !hasBooking || !isCurrentMonth
        ? 'text-gray-300 cursor-not-allowed'
        : dayIndex === 0
        ? 'text-red-500 hover:bg-gray-50'
        : dayIndex === 6
        ? 'text-blue-500 hover:bg-gray-50'
        : 'hover:bg-gray-50'
    }
    rounded-lg
    transition-colors
    ${hasBooking && isCurrentMonth ? 'cursor-pointer' : ''}
  `,
  dayNumber: `
    text-sm
    font-medium
  `,
  bookingInfo: `
    flex
    flex-wrap
    gap-1
    mt-auto
    justify-center
    md:justify-start
    md:flex-col
  `,
  bookingItem: `
    flex
    flex-col
    items-center
    md:flex-row
    md:items-center
    md:gap-1
  `,
  bookingDot: (status: number) => `
    w-2
    h-2
    rounded-full
    ${
      status === 3
        ? 'bg-green-400'
        : status === 1
        ? 'bg-yellow-400'
        : 'bg-red-400'
    }
  `,
  restaurantName: (status: number) => `
    text-xs
    truncate
    hidden
    md:hidden
    lg:block
    md:max-w-[80px]
    ${
      status === 3
        ? 'text-green-400'
        : status === 1
        ? 'text-yellow-400'
        : 'text-red-400'
    }
  `,
} as const;

const BookingCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedBookingId, setSelectedBookingId] = useState<number | null>(
    null,
  );

  const { bookings } = useBookings();

  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];

  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const days = [];
    const startPadding = firstDay.getDay();

    // 이전 달 날짜
    for (let i = 0; i < startPadding; i++) {
      const date = new Date(year, month, -startPadding + i + 1);
      days.push({ date, isCurrentMonth: false });
    }

    // 이번 달 날짜
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(year, month, i);
      days.push({ date, isCurrentMonth: true });
    }

    // 다음 달 날짜
    const endPadding = 42 - days.length;
    for (let i = 1; i <= endPadding; i++) {
      const date = new Date(year, month + 1, i);
      days.push({ date, isCurrentMonth: false });
    }

    return days;
  };

  // 날짜별 예약 정보 조회
  const getBookingsForDay = (date: Date) => {
    return (
      bookings?.filter((booking) => {
        const bookingDate = new Date(booking.bookingDate);
        return (
          bookingDate.getDate() === date.getDate() &&
          bookingDate.getMonth() === date.getMonth() &&
          bookingDate.getFullYear() === date.getFullYear()
        );
      }) || []
    );
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isSameDay = (date1: Date | null, date2: Date) => {
    if (!date1) return false;
    return date1.toDateString() === date2.toDateString();
  };

  const formatMonth = (date: Date) => {
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월`;
  };

  const changeMonth = (delta: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + delta);
    setCurrentDate(newDate);
  };

  return (
    <div className={STYLES.container}>
      {/* 범례 */}
      <div className={STYLES.legend}>
        {Object.entries(BookingStatusConfig).map(([status, config]) => (
          <div key={status} className="flex items-center gap-2">
            <div className={STYLES.bookingDot(Number(status))} />
            <span className="text-sm text-gray-700">{config.text}</span>
          </div>
        ))}
      </div>

      {/* 캘린더 */}
      <div className={STYLES.calendar}>
        <div className={STYLES.header}>
          <button className={STYLES.navButton} onClick={() => changeMonth(-1)}>
            ←
          </button>
          <span className={STYLES.monthTitle}>{formatMonth(currentDate)}</span>
          <button className={STYLES.navButton} onClick={() => changeMonth(1)}>
            →
          </button>
        </div>

        <div className={STYLES.weekdays}>
          {weekdays.map((day, index) => (
            <div key={day} className={STYLES.weekday(index)}>
              {day}
            </div>
          ))}
        </div>

        <div className={STYLES.days}>
          {getDaysInMonth().map(({ date, isCurrentMonth }, i) => {
            const dayIndex = date.getDay();
            const dayBookings = getBookingsForDay(date);

            return (
              <button
                key={i}
                className={STYLES.day(
                  isSameDay(selectedDate, date),
                  isToday(date),
                  dayBookings.length > 0,
                  dayIndex,
                  isCurrentMonth,
                )}
                onClick={() => {
                  if (dayBookings.length > 0) {
                    setSelectedDate(date);
                    setSelectedBookingId(dayBookings[0].id);
                  }
                }}
                disabled={!isCurrentMonth || dayBookings.length === 0}
              >
                <span className={STYLES.dayNumber}>{date.getDate()}</span>
                {dayBookings.length > 0 && (
                  <div className={STYLES.bookingInfo}>
                    {dayBookings.map((booking) => (
                      <div key={booking.id} className={STYLES.bookingItem}>
                        <div
                          className={STYLES.bookingDot(booking.status)}
                          title={booking.restaurant.name}
                        />
                        <span className={STYLES.restaurantName(booking.status)}>
                          {booking.restaurant.name}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {selectedBookingId && (
        <BookingModal
          bookingId={selectedBookingId}
          isOpen={!!selectedBookingId}
          onClose={() => setSelectedBookingId(null)}
        />
      )}
    </div>
  );
};

export default BookingCalendar;
