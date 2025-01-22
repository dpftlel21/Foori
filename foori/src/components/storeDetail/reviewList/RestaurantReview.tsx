import { useState } from 'react';
import ReviewPanel from './ReviewPanel';
import ReviewPreview from './ReviewPreview';

interface ReviewProps {
  restaurantId: number;
}

// 더미 데이터
const DUMMY_REVIEWS = Array(10)
  .fill(null)
  .map((_, i) => ({
    id: i + 1,
    rating: Math.floor(Math.random() * 5) + 1,
    content: `맛있어요! 정말 좋았습니다. 특히 서비스가 너무 좋았고, 음식도 맛있었어요. ${
      i + 1
    }번째 리뷰입니다.`,
    images: i % 2 === 0 ? ['/dummy-food-1.jpg', '/dummy-food-2.jpg'] : [],
    author: `사용자${i + 1}`,
    createdAt: new Date(2024, 0, i + 1).toISOString(),
  }));

const RestaurantReview = ({ restaurantId }: ReviewProps) => {
  const [isFullView, setIsFullView] = useState(false);
  const [sortBy, setSortBy] = useState<'latest' | 'rating'>('latest');

  const sortedReviews = [...DUMMY_REVIEWS].sort((a, b) => {
    if (sortBy === 'latest') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    return b.rating - a.rating;
  });

  const previewReviews = sortedReviews.slice(0, 3);

  return (
    <>
      <ReviewPreview
        reviews={previewReviews}
        totalCount={DUMMY_REVIEWS.length}
        onShowAll={() => setIsFullView(true)}
      />

      <ReviewPanel
        isOpen={isFullView}
        onClose={() => setIsFullView(false)}
        reviews={sortedReviews}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />
    </>
  );
};

export default RestaurantReview;
