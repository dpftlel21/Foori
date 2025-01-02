import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import './CustomCalendar.css';

interface CalendarProps {
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
}

const Calendar = ({ selectedDate, setSelectedDate }: CalendarProps) => {
  const CalendarContainer =
    'w-[30vw] h-[35vh] flex justify-around items-center';

  const handleDateClick = (arg: any) => {
    const clickedDate = new Date(arg.date);
    setSelectedDate(clickedDate);
  };

  return (
    <div className={CalendarContainer}>
      <FullCalendar
        locale="kr"
        plugins={[dayGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: 'prev',
          center: 'title',
          right: 'next',
        }}
        dateClick={handleDateClick}
        selectable={true}
        selectMirror={true}
        initialDate={selectedDate || new Date()}
        dayCellClassNames={(arg) => {
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
      />
    </div>
  );
};

export default Calendar;
