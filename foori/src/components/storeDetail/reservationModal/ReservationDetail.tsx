import { useState } from 'react';

interface ReservationDetailProps {
  openTime: string;
  closeTime: string;
}

const ReservationDetail = ({ openTime, closeTime }: ReservationDetailProps) => {
  const [selectedPeriod, setSelectedPeriod] = useState<
    '오전' | '점심' | '오후'
  >('오전');

  // 공통 스타일 상수
  const STYLES = {
    container: 'w-full max-w-[500px] p-6',
    title: 'text-lg font-bold mb-2',
    subtitle: 'text-sm text-gray-500',
    sectionContainer: 'mb-8',
    periodButtonContainer: 'grid grid-cols-3 gap-4 mb-8',
    timeButtonContainer: 'grid grid-cols-4 gap-2 mb-8',
    memberButtonContainer: 'flex flex-wrap gap-2',
    periodButton: (isSelected: boolean) => `
    py-2  // 높이 줄임
    text-center 
    transition-colors
    border-b-2  // 밑줄 추가
    ${
      isSelected
        ? 'border-[#e38994fb] text-[#e38994fb] font-bold'
        : 'border-transparent text-gray-600'
    }
    hover:text-[#e38994fb]
  `,
    timeButton: (isBreakTime: boolean) => `
      py-2 
      rounded-lg 
      text-center 
      transition-colors
      ${
        isBreakTime
          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
          : 'bg-[#e38994fb] text-white hover:bg-[#fcb69f]'
      }
    `,
    memberButton:
      'px-4 py-2 rounded-full bg-gray-100 text-gray-600 hover:bg-[#e38994fb] hover:text-white transition-colors',
  };

  // 영업 시간을 기반으로 예약 가능 시간대 생성
  const generateTimeSlots = () => {
    const slots = [];
    const start = parseInt(openTime.split(':')[0]);
    const end = parseInt(closeTime.split(':')[0]);

    for (let hour = start; hour < end; hour++) {
      let period;
      if (hour < 12) {
        period = '오전';
      } else if (hour >= 12 && hour < 14) {
        period = '점심';
      } else {
        period = '오후';
      }

      const displayHour = hour > 12 ? hour - 12 : hour;
      const isBreakTime = hour >= 15 && hour < 17;

      slots.push({
        time: `${displayHour}:00`,
        period: period,
        originalHour: hour,
        isBreakTime: isBreakTime,
      });
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();
  const filteredTimeSlots = timeSlots.filter(
    (slot) => slot.period === selectedPeriod,
  );

  return (
    <div className={STYLES.container}>
      {/* 예약 시간 타이틀 */}
      <div className={STYLES.sectionContainer}>
        <h2 className={STYLES.title}>예약 시간</h2>
        <p className={STYLES.subtitle}>(브레이크 타임 - 15:00 ~ 17:00)</p>
      </div>

      {/* 시간대 선택 */}
      <div className={STYLES.periodButtonContainer}>
        {['오전', '점심', '오후'].map((period) => (
          <button
            key={period}
            className={STYLES.periodButton(selectedPeriod === period)}
            onClick={() =>
              setSelectedPeriod(period as '오전' | '점심' | '오후')
            }
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
            className={STYLES.timeButton(slot.isBreakTime)}
            disabled={slot.isBreakTime}
          >
            {slot.time}
          </button>
        ))}
      </div>

      {/* 구성원 */}
      <div className={STYLES.sectionContainer}>
        <h2 className={STYLES.title}>구성원</h2>
        <div className={STYLES.memberButtonContainer}>
          {['2명', '3명', '4명', '5~6명', '6명 이상'].map((count, index) => (
            <button key={index} className={STYLES.memberButton}>
              {count}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReservationDetail;
