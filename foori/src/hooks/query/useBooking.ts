import { useQuery } from 'react-query';
import { cookieStorage } from '../../api/utils/cookies';

export interface BookingListResponse {
  id: number;
  orderId: string;
  bookingDate: string;
  bookingTime: string;
  numOfPeople: number;
  status: number;
  restaurant: {
    id: number;
    name: string;
    address: string;
    locationNum: string;
    postalCode: string;
    telNum: string;
  };
  isReviewed: number;
}

export interface BookingDetailResponse
  extends Omit<BookingListResponse, 'restaurant'> {
  isReviewed: number;
  paymentStatus: number;
  totalPrice: number;
  restaurant: {
    id: number;
    name: string;
    address: string;
    locationNum: string;
    postalCode: string;
    telNum: string;
  };
  bookingMenus: {
    menu: {
      name: string;
      price: number;
    };
    quantity: number;
  }[];
}

export const useBookings = (bookingId?: number) => {
  const getMyBookings = async (): Promise<BookingListResponse[]> => {
    const token = cookieStorage.getToken();
    const response = await fetch(
      `${import.meta.env.VITE_BACK_URL}/api/mypage/my-booking`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return response.json();
  };

  const getBookingDetail = async (
    id: number,
  ): Promise<BookingDetailResponse> => {
    const token = cookieStorage.getToken();
    const response = await fetch(
      `${import.meta.env.VITE_BACK_URL}/api/mypage/my-booking/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    console.log('response', response);
    return response.json();
  };

  const bookingsQuery = useQuery({
    queryKey: ['bookings'],
    queryFn: getMyBookings,
  });

  const detailQuery = useQuery({
    queryKey: ['booking', bookingId],
    queryFn: () => (bookingId ? getBookingDetail(bookingId) : null),
    enabled: !!bookingId,
  });

  return {
    bookings: bookingsQuery.data,
    bookingDetail: detailQuery.data,
    isLoading: bookingsQuery.isLoading || detailQuery.isLoading,
    error: bookingsQuery.error || detailQuery.error,
  };
};
