import { EventContentArg } from '@fullcalendar/core';
import { BookingStatusConfig } from './BookingStatusConfig';

interface BookingContentProps {
  bookingInfo: EventContentArg;
}

const BookingContent = ({ bookingInfo }: BookingContentProps) => {
  const { numOfPeople, status } = bookingInfo.event.extendedProps;
  const time = bookingInfo.event.start?.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  const config =
    BookingStatusConfig[status as keyof typeof BookingStatusConfig];

  return (
    <div className="booking-content flex items-center gap-1 p-1">
      <span className="whitespace-nowrap text-xs md:text-sm">{time}</span>
      <span className="whitespace-nowrap text-xs md:text-sm">
        {numOfPeople}명
      </span>
      <span
        className={`ml-auto text-xs px-1 rounded md:${config.textColor} md:bg-transparent ${config.color} text-white`}
      >
        {config.text}
      </span>
    </div>
  );
};

export default BookingContent;
