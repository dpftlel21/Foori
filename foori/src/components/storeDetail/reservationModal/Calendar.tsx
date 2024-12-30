import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import { useState } from 'react';
import './CustomCalendar.css';

const Calendar = () => {
  const CalendarContainer =
    'w-[30vw] h-[35vh] flex justify-around items-center';
  const [selectedDate, setSelectedDate] = useState<string>('');

  const handleDateClick = (arg: any) => {
    // arg.dateStr은 'YYYY-MM-DD' 형식의 문자열입니다
    setSelectedDate(arg.dateStr);
    console.log('선택된 날짜:', arg.dateStr);
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
        dateClick={handleDateClick} // 날짜 클릭 이벤트 핸들러 추가
        selectable={true} // 날짜 선택 가능하도록 설정
      />
    </div>
  );
};

export default Calendar;
