import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import { useState } from 'react';
import { useBookings } from '../../../hooks/useBooking';
import './BookingCalendar.css';
import BookingContent from './BookingContent';
import BookingModal from './BookingModal';

const BookingCalendar = () => {
  const [selectedBookingId, setSelectedBookingId] = useState<number | null>(
    null,
  );
  const { bookings } = useBookings();

  const events = bookings?.map((booking) => ({
    id: booking.id.toString(),
    title: booking.restaurant.name,
    start: booking.bookingDate,
    time: booking.bookingTime,
    extendedProps: {
      status: booking.status,
      numOfPeople: booking.numOfPeople,
      restaurantName: booking.restaurant.name,
    },
    className: `booking-event status-${booking.status}`,
  }));

  const handleEventClick = (info: any) => {
    setSelectedBookingId(Number(info.event.id));
  };

  return (
    <div className="w-full h-full bg-white rounded-xl shadow-sm p-4">
      <div className="grid grid-cols-1 auto-rows-fr gap-4 h-full">
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
          height="100%"
          eventContent={(bookingInfo) => (
            <BookingContent bookingInfo={bookingInfo} />
          )}
          locale="ko"
          dayMaxEvents={3}
          moreLinkContent={(args) => `+${args.num}개`}
          buttonText={{
            today: '오늘',
            month: '월',
            week: '주',
            day: '일',
          }}
          firstDay={0}
          dayHeaderFormat={{ weekday: 'short' }}
          fixedWeekCount={false}
        />
      </div>
      <BookingModal
        bookingId={selectedBookingId}
        isOpen={!!selectedBookingId}
        onClose={() => setSelectedBookingId(null)}
      />
    </div>
  );
};

export default BookingCalendar;
