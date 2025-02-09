import { postData } from '../api';

interface BookingRequest {
  bookingDateTime: string;
  numOfPeople: number;
  restaurant: {
    restaurantId: number;
  };
  bookingMenus: {
    menuId: number;
    quantity: number;
  }[];
}

export const handleReservation = async (data: BookingRequest) => {
  const response = await postData<BookingRequest>('api/booking', data);
  return response;
};
