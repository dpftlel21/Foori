import { Review } from '../../../types/review.type';
import ReviewCard from './ReviewCard';

interface ReviewPreviewProps {
  reviews: Review[];
  totalCount: number;
  onShowAll: () => void;
}

const ReviewPreview = ({
  reviews,
  totalCount,
  onShowAll,
}: ReviewPreviewProps) => {
  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} isPreview />
      ))}

      <button
        onClick={onShowAll}
        className="w-full py-3 text-[#FF800B] hover:text-[#fcb69f] font-medium
          border-t border-gray-100 mt-4 rounded-lg hover:bg-[#FF800B]/5 transition-colors"
      >
        전체 리뷰 보기 ({totalCount})
      </button>
    </div>
  );
};

export default ReviewPreview;
