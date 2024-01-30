import { useState } from 'react';
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from '@fullcalendar/react';

const Calendar = () => {
  const [timeOfDay, setTimeOfDay] = useState('morning'); // 'morning' 또는 'afternoon'
  const [numberOfPeople, setNumberOfPeople] = useState(2);

  const handleTimeOfDayChange = (event : any) => {
    setTimeOfDay(event.target.value);
  };

  const handleNumberOfPeopleChange = (event : any) => {
    setNumberOfPeople(event.target.value);
  };

  return (
    <div>
      <div>
        <label>
          시간대 선택:
          <select value={timeOfDay} onChange={handleTimeOfDayChange}>
            <option value="morning">오전</option>
            <option value="afternoon">오후</option>
          </select>
        </label>
      </div>

      <div>
        <label>
          인원 선택:
          <select value={numberOfPeople} onChange={handleNumberOfPeopleChange}>
            <option value={2}>2명</option>
            <option value={4}>4명</option>
            {/* 추가적인 옵션들... */}
          </select>
        </label>
      </div>

      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={[
          // 예약된 시간 데이터를 이곳에 추가
          { title: '예약된 이벤트', start: '2024-01-30T10:00:00', end: '2024-01-30T12:00:00' },
          // 추가적인 예약된 이벤트들...
        ]}
      />
    </div>
  );
};

export default Calendar;
