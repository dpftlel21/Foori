import { useEffect, useState } from 'react';
import { getReview } from '../../../api/review';

interface Review {
  id: number;
  rating: number;
  content: string;
  createdAt: string;
  images?: string[];
  user: {
    nickname: string;
  };
}

interface RestaurantReviewProps {
  restaurantId: number;
}

const RestaurantReview = ({ restaurantId }: RestaurantReviewProps) => {
  console.log('restaurantId', restaurantId);
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getReview(restaurantId);
        setReviews(data);
      } catch (error) {
        console.error('리뷰 조회 실패:', error);
      }
    };

    fetchReviews();
  }, [restaurantId]);

  return (
    <div className="w-full h-full overflow-y-auto space-y-4 p-2">
      {reviews?.length > 0 ? (
        reviews.map((review) => (
          <div
            key={review.id}
            className="bg-white rounded-lg shadow-sm p-4 border border-gray-100 hover:border-pink-200 transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <span className="font-medium text-gray-900">
                  {review.user.nickname}
                </span>
                <span className="text-gray-500 text-sm ml-2">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-yellow-400">
                  {'★'.repeat(review.rating)}
                </span>
                <span className="text-gray-300">
                  {'☆'.repeat(5 - review.rating)}
                </span>
              </div>
            </div>

            <p className="text-gray-700 mb-3">{review.content}</p>

            {review.images && review.images.length > 0 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {review.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`리뷰 이미지 ${index + 1}`}
                    className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-lg flex-shrink-0"
                  />
                ))}
              </div>
            )}
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500 py-8">
          아직 작성된 리뷰가 없습니다.
        </div>
      )}
    </div>
  );
};

export default RestaurantReview;
