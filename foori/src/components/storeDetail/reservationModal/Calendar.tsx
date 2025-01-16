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

  // 영업일이 아닌 날짜 체크
  const openDaysArray = openDays.split(',');
  const isClosedDay = (date: Date) => {
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

  // 날짜 컨텐츠 렌더링 핸들러
  const handleDayCellContent = (arg: any) => {
    const isHoliday = isClosedDay(arg.date);

    return {
      html: `
        <div class="fc-date">${arg.dayNumberText}</div>
        ${isHoliday ? '<div class="fc-holiday-text">휴무</div>' : ''}
      `,
    };
  };

  // 날짜 클래스 핸들러
  const handleDayCellClassNames = (arg: any) => {
    const classes: string[] = [];
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    // 과거 날짜인 경우
    if (arg.date < currentDate) {
      classes.push('fc-day-past');
    }

    // 휴무일인 경우
    if (isClosedDay(arg.date)) {
      classes.push('fc-day-closed');
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
          dayCellContent={handleDayCellContent}
          dateClick={handleDateClick}
          selectable={true}
          selectMirror={true}
          initialDate={selectedDate || new Date()}
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
