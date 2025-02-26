import { useEffect, useState } from 'react';

interface DateRangePickerProps {
  onRangeChange: (startDate: string, endDate: string) => void;
}

const STYLES = {
  wrapper: `
    flex
    flex-row
    gap-3
  `,
  inputGroup: `
    flex
    items-center
    gap-2
  `,
  label: `
    text-xs
    md:text-sm
    text-gray-600
    font-medium
  `,
  input: `
    px-3
    py-2
    rounded-lg
    border
    border-gray-200
    text-sm
    focus:outline-none
    focus:ring-2
    focus:ring-[#e38994fb]
    focus:border-transparent
  `,
} as const;

const DateRangePicker = ({ onRangeChange }: DateRangePickerProps) => {
  // 오늘 날짜와 이번 달의 1일을 구합니다
  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  // YYYY-MM-DD 형식의 문자열로 변환
  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const [startDate, setStartDate] = useState(formatDate(firstDayOfMonth));
  const [endDate, setEndDate] = useState(formatDate(today));

  // 컴포넌트 마운트 시 초기 날짜 범위 전달
  useEffect(() => {
    onRangeChange(startDate, endDate);
  }, []);

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStartDate = e.target.value;
    setStartDate(newStartDate);
    if (endDate && newStartDate <= endDate) {
      onRangeChange(newStartDate, endDate);
    }
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEndDate = e.target.value;
    setEndDate(newEndDate);
    if (startDate && startDate <= newEndDate) {
      onRangeChange(startDate, newEndDate);
    }
  };

  return (
    <div className={STYLES.wrapper}>
      <div className={STYLES.inputGroup}>
        <label className={STYLES.label}>시작일</label>
        <input
          type="date"
          value={startDate}
          onChange={handleStartDateChange}
          max={endDate || undefined}
          className={STYLES.input}
        />
      </div>
      <div className={STYLES.inputGroup}>
        <label className={STYLES.label}>종료일</label>
        <input
          type="date"
          value={endDate}
          onChange={handleEndDateChange}
          min={startDate || undefined}
          className={STYLES.input}
        />
      </div>
    </div>
  );
};

export default DateRangePicker;
