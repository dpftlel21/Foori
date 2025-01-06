import RestaurantReservation from '../components/storeDetail/RestaurantReservation';

const Detail = () => {
  const Container =
    'w-full h-screen bg-gradient-to-b from-[#ffecd2] to-[#fcb69f]';

  return (
    <main className={Container}>
      <RestaurantReservation />
    </main>
  );
};

export default Detail;
