import { postData } from '../api';

interface BookingRequest {
  bookingDateTime: Date;
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
