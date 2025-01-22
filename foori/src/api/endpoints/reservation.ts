import { cookieStorage } from '../utils/cookies';

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
  const token = cookieStorage.getToken();

  const response = await fetch(`api/booking`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return response;
};
