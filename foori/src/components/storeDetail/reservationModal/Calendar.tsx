import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import './CustomCalendar.css';

interface CalendarProps {
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
}

const Calendar = ({ selectedDate, setSelectedDate }: CalendarProps) => {
  const STYLES = {
    container: `
      w-full
      min-h-[300px]
      p-2
      flex
      justify-center
      items-center
      bg-white
      rounded-lg
      md:w-1/2
      md:min-h-[400px]
      md:p-4
    `,

    calendarWrapper: `
      w-full
      h-full
      overflow-hidden
      shadow-sm
      border
      border-gray-100
      rounded-lg
    `,
  };

  const handleDateClick = (arg: any) => {
    const clickedDate = new Date(arg.date);
    setSelectedDate(clickedDate);
  };

  return (
    <div className={STYLES.container}>
      <div className={STYLES.calendarWrapper}>
        <FullCalendar
          locale="kr"
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: 'prev',
            center: 'title',
            right: 'next',
          }}
          dateClick={handleDateClick}
          selectable={true}
          selectMirror={true}
          initialDate={selectedDate || new Date()}
          height="100%"
          views={{
            dayGridMonth: {
              dayMaxEventRows: 0,
              fixedWeekCount: false,
            },
          }}
          dayCellClassNames={(arg: any): string[] | 'fc-day-selected' => {
            if (
              selectedDate &&
              arg.date.getDate() === selectedDate.getDate() &&
              arg.date.getMonth() === selectedDate.getMonth() &&
              arg.date.getFullYear() === selectedDate.getFullYear()
            ) {
              return 'fc-day-selected';
            }
            return [];
          }}
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
