import { EventContentArg } from '@fullcalendar/core';

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

  const STYLES = {
    container: 'booking-content flex items-center gap-1 p-1',
    time: 'whitespace-nowrap',
    people: 'whitespace-nowrap',
    status: `
      ml-auto text-xs px-1 rounded
      ${
        status === 3
          ? 'text-blue-600'
          : status === 2
          ? 'text-yellow-600'
          : 'text-red-600'
      }
    `,
  } as const;

  return (
    <div className={STYLES.container}>
      <span className={STYLES.time}>{time}</span>
      <span className={STYLES.people}>{numOfPeople}명</span>
      <span className={STYLES.status}>
        {status === 3 ? '예약완료' : status === 1 ? '대기중' : '취소됨'}
      </span>
    </div>
  );
};

export default BookingContent;
