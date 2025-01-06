interface BookingStatusBadgeProps {
  status: number;
  className?: string;
}

export const BookingStatusBadge = ({
  status,
  className = '',
}: BookingStatusBadgeProps) => {
  const statusConfig = {
    1: { text: '예약 대기', color: 'bg-yellow-100 text-yellow-800' },
    9: { text: '예약 취소', color: 'bg-red-100 text-red-800' },
    3: { text: '예약 완료', color: 'bg-green-100 text-green-800' },
  };

  const config = statusConfig[status as keyof typeof statusConfig];

  return (
    <span
      className={`px-2 py-0.5 rounded-full text-xs font-medium ${config.color} ${className}`}
    >
      {config.text}
    </span>
  );
};
