import { BookingStatusConfig } from './BookingStatusConfig';

interface BookingStatusBadgeProps {
  status: number;
  className?: string;
}

export const BookingStatusBadge = ({
  status,
  className = '',
}: BookingStatusBadgeProps) => {
  const config =
    BookingStatusConfig[status as keyof typeof BookingStatusConfig];

  return (
    <span
      className={`px-2 py-0.5 rounded-full text-xs font-medium ${config.badge} ${className}`}
    >
      {config.text}
    </span>
  );
};
