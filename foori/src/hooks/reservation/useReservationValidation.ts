import { useToast } from '../../contexts/ToastContext';

/**
 * 예약 유효성 검사를 위한 Props 인터페이스
 */
interface ValidationProps {
  selectedDate: Date | null; // 선택된 예약 날짜
  selectedTime: Date | null; // 선택된 예약 시간
  openTime: string; // 매장 오픈 시간
  closeTime: string; // 매장 마감 시간
  openDays: string; // 영업일 (요일)
  selectedMembers: number; // 선택된 예약 인원
  maxCapacity?: number; // 최대 수용 가능 인원 (선택적)
}

/**
 * 예약 유효성 검사를 위한 커스텀 훅
 */
export const useReservationValidation = () => {
  const { showToast } = useToast();

  /**
   * 스타일 상수 정의
   */
  const ERROR_STYLES = {
    // 에러 메시지 스타일
    errorMessage: 'text-red-500 text-sm mt-1',
    // 경고 메시지 스타일
    warningMessage: 'text-yellow-500 text-sm mt-1',
  } as const;

  /**
   * 예약 유효성 검사 함수
   * @param props ValidationProps - 검증에 필요한 데이터
   * @returns boolean - 유효성 검사 통과 여부
   */
  const validateReservation = ({
    selectedDate,
    selectedTime,
    openTime,
    closeTime,
    openDays,
    selectedMembers,
    maxCapacity = 8, // 기본 최대 인원 8명
  }: ValidationProps): boolean => {
    // 기본 입력값 검증
    if (!selectedDate || !selectedTime) {
      showToast('날짜와 시간을 선택해주세요.', 'warning');
      return false;
    }

    // 현재 시간 기준 설정
    const now = new Date();
    const reservationDateTime = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      selectedTime.getHours(),
      selectedTime.getMinutes(),
    );

    // 1. 과거 일자 체크
    if (reservationDateTime < now) {
      showToast('과거 시간으로는 예약할 수 없습니다.', 'warning');
      return false;
    }

    // 2. 30일 이내 예약 체크
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
    if (reservationDateTime > thirtyDaysFromNow) {
      showToast('예약은 30일 이내의 날짜만 가능합니다.', 'warning');
      return false;
    }

    // 3. 영업 요일 체크 - 수정된 부분
    const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
    const selectedDayName = dayNames[selectedDate.getDay()];
    const openDaysArray = openDays.split(','); // 문자열을 배열로 변환

    if (!openDaysArray.includes(selectedDayName)) {
      showToast('해당 요일은 휴무일입니다.', 'warning');
      return false;
    }

    // 4. 영업 시간 체크
    const [openHour] = openTime.split(':').map(Number);
    const [closeHour] = closeTime.split(':').map(Number);
    const selectedHour = selectedTime.getHours();

    if (selectedHour < openHour || selectedHour >= closeHour) {
      showToast(
        `영업 시간(${openTime}~${closeTime})에만 예약 가능합니다.`,
        'warning',
      );
      return false;
    }

    // 5. 브레이크타임 체크 (15:00 ~ 17:00)
    if (selectedHour >= 15 && selectedHour < 17) {
      showToast('브레이크타임(15:00~17:00)에는 예약할 수 없습니다.', 'warning');
      return false;
    }

    // 6. 최소 예약 시간 체크 (1시간 전)
    const hoursDifference =
      (reservationDateTime.getTime() - now.getTime()) / (1000 * 60 * 60);
    if (hoursDifference < 1) {
      showToast('예약은 최소 1시간 전에 해주세요.', 'warning');
      return false;
    }

    // 7. 최대 예약 인원 체크
    if (selectedMembers > maxCapacity) {
      showToast(`최대 ${maxCapacity}명까지만 예약 가능합니다.`, 'warning');
      return false;
    }

    // 8. 최소 예약 인원 체크
    if (selectedMembers < 1) {
      showToast('최소 1명 이상 예약해야 합니다.', 'warning');
      return false;
    }

    // 9. 특정 시간대 예약 제한 (마감 3시간 전까지만 예약 가능)
    const lastBookingHour = closeHour - 3;
    if (selectedHour >= lastBookingHour) {
      showToast('마감 3시간 전까지만 예약 가능합니다.', 'warning');
      return false;
    }

    // 모든 검증 통과
    return true;
  };

  /**
   * 날짜 포맷팅 유틸리티 함수
   * @param date Date 객체
   * @returns 포맷팅된 날짜 문자열 (예: 2024년 3월 15일 금요일)
   */
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    });
  };

  /**
   * 시간 포맷팅 유틸리티 함수
   * @param date Date 객체
   * @returns 포맷팅된 시간 문자열 (예: 14:30)
   */
  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  // 훅에서 사용할 함수들과 스타일 반환
  return {
    validateReservation,
    formatDate,
    formatTime,
    ERROR_STYLES,
  };
};
