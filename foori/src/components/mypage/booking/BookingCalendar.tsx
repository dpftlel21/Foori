import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import { useState } from 'react';
import { useBookings } from '../../../hooks/useBooking';
import './BookingCalendar.css';
import BookingModal from './BookingModal';
import { BookingStatusBadge } from './BookingStatusBadge';

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
    <div className="p-4 bg-white rounded-xl shadow-sm">
      <div className="booking-calendar-container">
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
          eventContent={renderEventContent}
          locale="ko"
          dayMaxEvents={3}
          moreLinkContent={(args) => `+${args.num}개 더보기`}
          buttonText={{
            today: '오늘',
            month: '월',
            week: '주',
            day: '일',
          }}
          firstDay={0} // 일요일부터 시작
          dayHeaderFormat={{ weekday: 'short' }} // 요일 표시 형식
          fixedWeekCount={false} // 6주 고정 해제
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

const renderEventContent = (eventInfo: any) => {
  const { status, numOfPeople } = eventInfo.event.extendedProps;
  const time = eventInfo.event.start.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  return (
    <div className="booking-event-content">
      <div className="event-title">{eventInfo.event.title}</div>
      <div className="event-info">
        <span className="event-time">{time}</span>
        <span className="event-people">{numOfPeople}명</span>
      </div>
      <BookingStatusBadge status={status} className="event-status" />
    </div>
  );
};

export default BookingCalendar;
