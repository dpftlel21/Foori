import { EventContentArg } from '@fullcalendar/core';
import { BookingStatusConfig } from './BookingStatusConfig';

interface BookingContentProps {
  bookingInfo: EventContentArg;
}

const STYLES = {
  container: `
    booking-content
    flex
    items-center
    gap-1
    p-1
    cursor-pointer
    rounded
    transition-colors
    hover:bg-gray-100
    group
  `,
  time: `
    whitespace-nowrap
    text-xs
    md:text-sm
  `,
  people: `
    whitespace-nowrap
    text-xs
    md:text-sm
  `,
  status: (
    config: (typeof BookingStatusConfig)[keyof typeof BookingStatusConfig],
  ) => `
    ml-auto
    text-xs
    px-1
    rounded
    md:${config.textColor}
    md:bg-transparent
    ${config.color}
    text-white
    group-hover:${config.lightColor}
    group-hover:${config.textColor}
    transition-colors
  `,
} as const;

const BookingContent = ({ bookingInfo }: BookingContentProps) => {
  const { numOfPeople, status, id } = bookingInfo.event.extendedProps;
  const time = bookingInfo.event.start?.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  const config =
    BookingStatusConfig[status as keyof typeof BookingStatusConfig];

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 이벤트 버블링 방지
    bookingInfo.event.setExtendedProp('selectedBookingId', id);
  };

  return (
    <div
      className={STYLES.container}
      onClick={handleClick}
      role="button"
      tabIndex={0}
    >
      <span className={STYLES.time}>{time}</span>
      <span className={STYLES.people}>{numOfPeople}명</span>
      <span className={STYLES.status(config)}>{config.text}</span>
    </div>
  );
};

export default BookingContent;
