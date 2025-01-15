import { useState } from 'react';

// 시간대 타입 정의
type TimePeriod = '오전' | '점심' | '오후';

// 시간 슬롯 인터페이스
interface TimeSlot {
  displayTime: string; // 화면에 표시될 시간 (예: "2:00")
  actualTime: Date; // 실제 Date 객체
  period: TimePeriod;
  isBreakTime: boolean;
}

// Props 인터페이스
interface ReservationDetailProps {
  openTime: string;
  closeTime: string;
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
  selectedTime: Date | null;
  setSelectedTime: (time: Date | null) => void;
  selectedMembers: number;
  setSelectedMembers: (members: number) => void;
}

const ReservationInfo = ({
  openTime,
  closeTime,
  selectedDate,
  selectedTime,
  setSelectedTime,
  selectedMembers,
  setSelectedMembers,
}: ReservationDetailProps) => {
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>('오전');

  // 구성원 옵션
  const MEMBER_OPTIONS = [
    { display: '2명', value: 2 },
    { display: '3명', value: 3 },
    { display: '4명', value: 4 },
    { display: '5~6명', value: 6 },
    { display: '6명 이상', value: 8 },
  ] as const;

  // 스타일 정의
  const STYLES = {
    container: 'w-full max-w-[400px]',
    title: 'text-lg font-bold mb-2',
    subtitle: 'text-sm text-gray-500',
    sectionContainer: 'mb-3',
    periodButtonContainer: 'grid grid-cols-3 gap-3 mb-6',
    timeButtonContainer: 'grid grid-cols-4 gap-1.5 mb-6',
    memberButtonContainer: 'flex flex-wrap gap-2',
    periodButton: (isSelected: boolean) => `
      py-2
      text-center
      transition-colors
      border-b-2
      ${
        isSelected
          ? 'border-[#e38994fb] text-[#e38994fb] font-bold'
          : 'border-transparent text-gray-600'
      }
      hover:text-[#e38994fb]
    `,
    timeButton: (isBreakTime: boolean, isSelected: boolean) => `
      py-1.5
      rounded-lg
      text-center
      text-sm
      transition-colors
      ${
        isBreakTime
          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
          : isSelected
          ? 'bg-[#e38994fb] text-white'
          : 'bg-gray-100 text-gray-600 hover:bg-[#fcb69f] hover:text-white'
      }
    `,
    memberButton: (isSelected: boolean) => `
      px-3
      py-1.5
      text-sm
      rounded-full
      transition-colors
      ${
        isSelected
          ? 'bg-[#e38994fb] text-white'
          : 'bg-gray-100 text-gray-600 hover:bg-[#fcb69f] hover:text-white'
      }
    `,
  } as const;

  // 시간 슬롯 생성 함수
  const generateTimeSlots = (): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    const start = parseInt(openTime.split(':')[0]);
    const end = parseInt(closeTime.split(':')[0]);

    for (let hour = start; hour < end; hour++) {
      let period: TimePeriod;
      if (hour < 12) {
        period = '오전';
      } else if (hour >= 12 && hour < 14) {
        period = '점심';
      } else {
        period = '오후';
      }

      const displayHour = hour > 12 ? hour - 12 : hour;
      const isBreakTime = hour >= 15 && hour < 17;

      // 현재 날짜로 Date 객체 생성
      const timeDate = selectedDate ? new Date(selectedDate) : new Date();
      timeDate.setHours(hour, 0, 0, 0);

      slots.push({
        displayTime: `${displayHour}:00`,
        actualTime: timeDate,
        period,
        isBreakTime,
      });
    }
    return slots;
  };

  // 시간 슬롯 생성 및 필터링
  const timeSlots = generateTimeSlots();
  const filteredTimeSlots = timeSlots.filter(
    (slot) => slot.period === selectedPeriod,
  );

  // 시간 비교 함수
  const isSameTime = (time1: Date | null, time2: Date): boolean => {
    if (!time1) return false;
    return (
      time1.getHours() === time2.getHours() &&
      time1.getMinutes() === time2.getMinutes()
    );
  };

  return (
    <div className={STYLES.container}>
      {/* 예약 시간 타이틀 */}
      <div className={STYLES.sectionContainer}>
        <h2 className={STYLES.title}>예약 시간</h2>
        <p className={STYLES.subtitle}>(브레이크 타임 - 15:00 ~ 17:00)</p>
      </div>

      {/* 시간대 선택 */}
      <div className={STYLES.periodButtonContainer}>
        {(['오전', '점심', '오후'] as const).map((period) => (
          <button
            key={period}
            className={STYLES.periodButton(selectedPeriod === period)}
            onClick={() => setSelectedPeriod(period)}
          >
            {period}
          </button>
        ))}
      </div>

      {/* 예약 시간 선택 */}
      <div className={STYLES.timeButtonContainer}>
        {filteredTimeSlots.map((slot, index) => (
          <button
            key={index}
            className={STYLES.timeButton(
              slot.isBreakTime,
              isSameTime(selectedTime, slot.actualTime),
            )}
            disabled={slot.isBreakTime}
            onClick={() => setSelectedTime(slot.actualTime)}
          >
            {slot.displayTime}
          </button>
        ))}
      </div>

      {/* 구성원 */}
      <div className={STYLES.sectionContainer}>
        <h2 className={STYLES.title}>구성원</h2>
        <div className={STYLES.memberButtonContainer}>
          {MEMBER_OPTIONS.map((option) => (
            <button
              key={option.value}
              className={STYLES.memberButton(selectedMembers === option.value)}
              onClick={() => setSelectedMembers(option.value)}
            >
              {option.display}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReservationInfo;
