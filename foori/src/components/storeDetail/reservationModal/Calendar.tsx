import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import './CustomCalendar.css';

interface CalendarProps {
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
  openDays: string;
}

const Calendar = ({
  selectedDate,
  setSelectedDate,
  openDays,
}: CalendarProps) => {
  console.log('openDays', openDays);

  const STYLES = {
    container: `
      w-full
      h-full
      flex
      flex-col
      bg-white
      rounded-lg
      overflow-hidden
    `,
    calendarWrapper: `
      flex-1
      w-full
    `,
  };

  // 영업일이 아닌 날짜 비활성화
  const openDaysArray = openDays.split(',');
  const isDateDisabled = (date: Date) => {
    const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
    const dayName = dayNames[date.getDay()];
    return !openDaysArray.includes(dayName);
  };

  // 날짜 선택 핸들러
  const handleDateClick = (arg: any) => {
    const clickedDate = new Date(arg.date);
    // 과거 날짜 선택 방지
    if (clickedDate < new Date()) return;
    setSelectedDate(clickedDate);
  };

  // 날짜 클래스 핸들러
  const handleDayCellClassNames = (arg: any) => {
    const classes: string[] = [];
    const currentDate = new Date();

    // 과거 날짜 처리
    if (arg.date < currentDate) {
      classes.push('fc-day-past');
    }

    // 영업일이 아닌 경우
    if (isDateDisabled(arg.date)) {
      classes.push('fc-day-disabled');
    }

    // 선택된 날짜인 경우
    if (
      selectedDate &&
      arg.date.getDate() === selectedDate.getDate() &&
      arg.date.getMonth() === selectedDate.getMonth() &&
      arg.date.getFullYear() === selectedDate.getFullYear()
    ) {
      classes.push('fc-day-selected');
    }

    return classes;
  };

  return (
    <div className={STYLES.container}>
      <div className={STYLES.calendarWrapper}>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          locale="ko"
          headerToolbar={{
            left: 'prev',
            center: 'title',
            right: 'next',
          }}
          dateClick={handleDateClick}
          selectable={true}
          selectMirror={true}
          initialDate={selectedDate || new Date()}
          validRange={{
            start: new Date(),
            end: new Date(new Date().setDate(new Date().getDate() + 31)),
          }}
          height="100%"
          dayCellClassNames={handleDayCellClassNames}
          buttonText={{
            today: '오늘',
            month: '월',
            week: '주',
            day: '일',
          }}
          titleFormat={{
            year: 'numeric',
            month: 'long',
          }}
        />
      </div>
    </div>
  );
};

export default Calendar;
