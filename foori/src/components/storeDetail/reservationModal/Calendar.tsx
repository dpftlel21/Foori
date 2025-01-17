import { useState } from 'react';

interface CalendarProps {
  selectedDate: Date | null;
  setSelectedDate: (date: Date) => void;
  openDays: string;
}

const Calendar = ({
  selectedDate,
  setSelectedDate,
  openDays,
}: CalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const STYLES = {
    container: `
      w-full
      bg-white
      rounded-lg
      p-6
    `,
    header: `
      flex
      items-center
      justify-between
      mb-6
    `,
    monthText: `
      text-xl
      font-bold
      text-gray-800
    `,
    navigationButton: `
      w-4
      h-4
      flex
      items-center
      justify-center
      text-gray-600
      hover:bg-gray-100
      rounded-full
      transition-colors
    `,
    weekdays: `
      grid
      grid-cols-7
      mb-4
    `,
    weekday: (dayIndex: number) => `
      text-center
      text-sm
      font-medium
      ${
        dayIndex === 0
          ? 'text-red-500'
          : dayIndex === 6
          ? 'text-blue-500'
          : 'text-gray-600'
      }
      py-2
    `,
    days: `
      grid
      grid-cols-7
    `,
    day: (
      isSelected: boolean,
      isToday: boolean,
      isAvailable: boolean,
      dayIndex: number,
      isCurrentMonth: boolean,
    ) => `
      aspect-[1.3/1]
      relative
      ${
        isSelected
          ? 'bg-[#e38994fb] text-white hover:bg-[#d27883fb]'
          : isToday
          ? 'bg-[#e3899420]'
          : 'bg-transparent'
      }
      ${
        !isAvailable || !isCurrentMonth
          ? 'text-gray-300 cursor-not-allowed'
          : dayIndex === 0
          ? 'text-red-500 hover:bg-gray-50'
          : dayIndex === 6
          ? 'text-blue-500 hover:bg-gray-50'
          : 'hover:bg-gray-50'
      }
      rounded-lg
      flex
      items-center
      justify-center
      text-sm
      font-medium
      transition-colors
      ${isAvailable && isCurrentMonth ? 'cursor-pointer' : ''}
    `,
  };

  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const days = [];
    const startPadding = firstDay.getDay();

    // 이전 달의 날짜들
    for (let i = 0; i < startPadding; i++) {
      const date = new Date(year, month, -startPadding + i + 1);
      days.push({ date, isCurrentMonth: false });
    }

    // 현재 달의 날짜들
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(year, month, i);
      days.push({ date, isCurrentMonth: true });
    }

    // 다음 달의 날짜들
    const endPadding = 42 - days.length; // 6주 채우기
    for (let i = 1; i <= endPadding; i++) {
      const date = new Date(year, month + 1, i);
      days.push({ date, isCurrentMonth: false });
    }

    return days;
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isAvailable = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // 과거 날짜 체크
    if (date < today) return false;

    // 영업일 체크
    const dayName = weekDays[date.getDay()];
    if (!openDays.includes(dayName)) return false;

    return true;
  };

  const isSameDay = (date1: Date | null, date2: Date) => {
    if (!date1) return false;
    return date1.toDateString() === date2.toDateString();
  };

  const formatMonth = (date: Date) => {
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월`;
  };

  const changeMonth = (delta: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + delta);
    setCurrentDate(newDate);
  };

  return (
    <div className={STYLES.container}>
      <div className={STYLES.header}>
        <button
          className={STYLES.navigationButton}
          onClick={() => changeMonth(-1)}
        >
          ←
        </button>
        <span className={STYLES.monthText}>{formatMonth(currentDate)}</span>
        <button
          className={STYLES.navigationButton}
          onClick={() => changeMonth(1)}
        >
          →
        </button>
      </div>

      <div className={STYLES.weekdays}>
        {weekDays.map((day, index) => (
          <div key={day} className={STYLES.weekday(index)}>
            {day}
          </div>
        ))}
      </div>

      <div className={STYLES.days}>
        {getDaysInMonth().map(({ date, isCurrentMonth }, i) => {
          const dayIndex = date.getDay();
          const dayIsAvailable = isAvailable(date);

          return (
            <button
              key={i}
              className={STYLES.day(
                isSameDay(selectedDate, date),
                isToday(date),
                dayIsAvailable,
                dayIndex,
                isCurrentMonth,
              )}
              onClick={() =>
                isCurrentMonth && dayIsAvailable && setSelectedDate(date)
              }
              disabled={!isCurrentMonth || !dayIsAvailable}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
