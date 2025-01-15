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

  const response = await fetch(`${import.meta.env.VITE_BACK_URL}/api/booking`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return response;
};
