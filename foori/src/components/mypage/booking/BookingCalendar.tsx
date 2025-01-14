import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import { useMemo, useState } from 'react';
import { useBookings } from '../../../hooks/useBooking';
import BookingModal from './BookingModal';
import { BookingStatusConfig } from './BookingStatusConfig';

const BookingCalendar = () => {
  const [selectedBookingId, setSelectedBookingId] = useState<number | null>(
    null,
  );
  const { bookings } = useBookings();

  const events = useMemo(() => {
    if (!bookings) return [];

    return bookings.map((booking) => ({
      id: booking.id.toString(),
      title: booking.restaurant.name,
      start: booking.bookingDate,
      extendedProps: {
        status: booking.status,
        numOfPeople: booking.numOfPeople,
      },
      className: `${
        BookingStatusConfig[booking.status as keyof typeof BookingStatusConfig]
          .color
      } text-white rounded-md p-1 text-xs`,
    }));
  }, [bookings]);

  const handleEventClick = (clickInfo: any) => {
    setSelectedBookingId(Number(clickInfo.event.id));
  };

  return (
    <div className="w-full md:h-full h-[calc(100vh-450px)]">
      {/* 예약 상태 범례 - 모바일에서만 표시 */}
      <div className="flex flex-wrap gap-2 p-3 mb-3 bg-white rounded-lg text-sm border border-[#e38994]">
        {Object.entries(BookingStatusConfig).map(([status, config]) => (
          <div key={status} className="flex items-center gap-1">
            <div className={`w-3 h-3 rounded-full ${config.color}`}></div>
            <span className="text-gray-700">{config.text}</span>
          </div>
        ))}
      </div>

      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventClick={handleEventClick}
        headerToolbar={{
          left: 'prev',
          center: 'title',
          right: 'next',
        }}
        locale="ko"
      />

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
