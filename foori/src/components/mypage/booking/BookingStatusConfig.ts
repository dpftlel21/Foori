// 예약 상태 관리를 위한 공통 설정 파일
export const BookingStatusConfig = {
  1: {
    text: '결제 대기',
    color: 'bg-yellow-500',
    textColor: 'text-yellow-800',
    lightColor: 'bg-yellow-100',
    badge: 'bg-yellow-100 text-yellow-800',
  },
  3: {
    text: '예약 완료',
    color: 'bg-green-500',
    textColor: 'text-green-800',
    lightColor: 'bg-green-100',
    badge: 'bg-green-100 text-green-800',
  },
  9: {
    text: '예약 취소',
    color: 'bg-red-500',
    textColor: 'text-red-800',
    lightColor: 'bg-red-100',
    badge: 'bg-red-100 text-red-800',
  },
} as const;
