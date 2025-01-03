import { useBookings } from '../../../hooks/useBooking';

interface BookingDetailProps {
  bookingId: number;
}

const BookingDetail = ({ bookingId }: BookingDetailProps) => {
  const { bookingDetail, isLoading, error } = useBookings(bookingId);

  if (isLoading) {
    return (
      <div className="p-3 text-center text-gray-500">
        <div className="animate-spin inline-block w-5 h-5 border-2 border-current border-t-transparent rounded-full" />
      </div>
    );
  }

  if (error) return <div className="p-3 text-red-600">상세 정보 조회 실패</div>;
  if (!bookingDetail) return null;

  return (
    <div className="p-3 sm:p-4 space-y-4 bg-white/50 rounded-b-lg text-sm">
      {/* 주문 메뉴 */}
      <div className="space-y-2">
        <h4 className="font-bold text-gray-800">주문 메뉴</h4>
        <div className="divide-y divide-pink-100">
          {bookingDetail.bookingMenus?.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center py-1.5"
            >
              <div className="flex items-center gap-2">
                <span>{item.menu.name}</span>
                <span className="text-gray-600">x {item.quantity}</span>
              </div>
              <span className="text-gray-800">
                {item.menu.price.toLocaleString()}원
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 총 결제금액 */}
      <div className="pt-2 border-t border-pink-200">
        <div className="flex justify-between items-center font-bold">
          <span>총 결제금액</span>
          <span className="text-pink-700">
            {bookingDetail.totalPrice.toLocaleString()}원
          </span>
        </div>
      </div>
    </div>
  );
};

export default BookingDetail;
