import { useMemo, useState } from 'react';
import { useBookings } from '../../../hooks/query/useGetBooking';

// 시간대 타입 정의
type TimePeriod = '오전' | '점심' | '오후';

// 시간 슬롯 인터페이스
interface TimeSlot {
  displayTime: string; // 화면에 표시될 시간 (예: "2:00")
  actualTime: Date; // 실제 Date 객체
  period: TimePeriod;
  isBreakTime: boolean;
  isBooked: boolean;
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
  timeButton: (
    isBreakTime: boolean,
    isBooked: boolean,
    isSelected: boolean,
  ) => `
    py-1.5
    rounded-lg
    text-center
    text-sm
    transition-colors
    ${
      isBreakTime || isBooked
        ? 'bg-gray-200 text-gray-400 cursor-not-allowed pointer-events-none'
        : isSelected
          ? 'bg-[#e38994fb] text-white cursor-pointer'
          : 'bg-gray-100 text-gray-600 hover:bg-[#fcb69f] hover:text-white cursor-pointer'
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
  const { bookings } = useBookings();
  console.log('bookings', bookings);

  // 선택된 날짜의 예약된 시간들을 확인
  const getBookedTimes = useMemo(() => {
    if (!selectedDate || !bookings) return new Set();

    return new Set(
      bookings
        .filter((booking) => {
          const bookingDate = new Date(booking.bookingDate);
          console.log('bookingDate', bookingDate);
          return (
            bookingDate.getFullYear() === selectedDate.getFullYear() &&
            bookingDate.getMonth() === selectedDate.getMonth() &&
            bookingDate.getDate() === selectedDate.getDate()
          );
        })
        .map((booking) => {
          // bookingTime은 "HH:MM:SS" 형식
          return parseInt(booking.bookingTime.split(':')[0]);
        }),
    );
  }, [selectedDate, bookings]);

  // 구성원 옵션
  const MemberOptions = [
    { display: '혼자', value: 1 },
    { display: '2명', value: 2 },
    { display: '3명', value: 3 },
    { display: '4명', value: 4 },
    { display: '5명 이상', value: 5 },
  ] as const;

  // 시간 슬롯 생성 함수
  const generateTimeSlots = (): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    const start = parseInt(openTime.split(':')[0]);
    const end = parseInt(closeTime.split(':')[0]);
    const bookedTimes = getBookedTimes;

    for (let hour = start; hour < end; hour++) {
      let period: TimePeriod;

      // period 결정
      if (hour < 12) {
        period = '오전';
      } else if (hour >= 12 && hour <= 14) {
        period = '점심';
      } else {
        period = '오후';
      }

      // 표시용 시간은 12시간제로
      const displayHour = hour > 12 ? hour - 12 : hour;
      const isBreakTime = hour >= 15 && hour < 17;
      const isBooked = bookedTimes.has(hour);

      const timeDate = selectedDate ? new Date(selectedDate) : new Date();
      timeDate.setHours(hour, 0, 0, 0);

      slots.push({
        displayTime: `${displayHour}:00`,
        actualTime: timeDate,
        period,
        isBreakTime,
        isBooked,
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
              slot.isBooked,
              isSameTime(selectedTime, slot.actualTime),
            )}
            disabled={slot.isBreakTime || slot.isBooked}
            onClick={() => {
              if (!slot.isBreakTime && !slot.isBooked) {
                setSelectedTime(slot.actualTime);
              }
            }}
            title={
              slot.isBooked
                ? '이미 예약된 시간입니다'
                : slot.isBreakTime
                  ? '브레이크 타임입니다'
                  : undefined
            }
          >
            {slot.displayTime}
          </button>
        ))}
      </div>

      {/* 구성원 */}
      <div className={STYLES.sectionContainer}>
        <h2 className={STYLES.title}>구성원</h2>
        <div className={STYLES.memberButtonContainer}>
          {MemberOptions.map((option) => (
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
