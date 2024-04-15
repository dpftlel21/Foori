import { useState } from 'react';
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from '@fullcalendar/react';
import './CustomCalendar.css'; // FullCalendar의 스타일을 덮어쓰기 위한 CSS 파일

const Calendar = () => {
  const CalendarContainer = "w-[40vw] h-[30vh] flex justify-around items-center";
  const [timeOfDay, setTimeOfDay] = useState('morning'); // 'morning' 또는 'afternoon'
  const [numberOfPeople, setNumberOfPeople] = useState(2);

  const handleTimeOfDayChange = (event : any) => {
    setTimeOfDay(event.target.value);
  };

  const handleNumberOfPeopleChange = (event : any) => {
    setNumberOfPeople(event.target.value);
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
  />
    </div>
  );
};

export default Calendar;
