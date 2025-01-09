import { useState } from 'react';
import { useBookings } from '../../../hooks/useBooking';
import MenuContainer from '../../common/MenuContainer';
import ReviewList from './ReviewList';
import ReviewTabs from './ReviewTabs';

const Review = () => {
  const [activeTab, setActiveTab] = useState<'available' | 'written'>(
    'available',
  );
  const { bookings } = useBookings();

  console.log('bookings', bookings);

  const completedBookings = bookings?.filter(
    (booking) => booking.status === 3 && !booking.isReviewed,
  );

  const writtenReviews = bookings?.filter(
    (booking) => booking.status === 3 && booking.isReviewed,
  );

  return (
    <MenuContainer>
      <div className="w-[95%] md:w-[80%] mx-auto p-4">
        <div className="bg-white rounded-xl shadow-xl border-2 border-[#EE6677] p-6">
          <ReviewTabs activeTab={activeTab} onTabChange={setActiveTab} />

          <div className="mt-6">
            {activeTab === 'available' ? (
              <ReviewList
                title="작성 가능한 리뷰"
                items={completedBookings}
                emptyMessage="작성 가능한 리뷰가 없습니다."
                type="available"
              />
            ) : (
              <ReviewList
                title="작성한 리뷰"
                items={writtenReviews}
                emptyMessage="작성한 리뷰가 없습니다."
                type="written"
              />
            )}
          </div>
        </div>
      </div>
    </MenuContainer>
  );
};

export default Review;
