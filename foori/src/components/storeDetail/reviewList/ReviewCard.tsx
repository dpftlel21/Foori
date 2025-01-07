import { useState } from 'react';
import { Review } from '../../../types/review.type';

interface ReviewCardProps {
  review: Review;
  isPreview?: boolean;
}

const ReviewCard = ({ review, isPreview = false }: ReviewCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-lg p-4 border border-gray-100 hover:border-[#FF800B]/20 transition-colors">
      <div className="flex justify-between items-start mb-3">
        <div>
          <div className="font-medium text-gray-800">{review.author}</div>
          <div className="text-sm text-gray-500">
            {formatDate(review.createdAt)}
          </div>
        </div>
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className={`text-lg ${
                i < review.rating ? 'text-yellow-400' : 'text-gray-300'
              }`}
            >
              ★
            </span>
          ))}
        </div>
      </div>

      {!isPreview && review.images.length > 0 && (
        <div className="flex gap-2 mb-3 overflow-x-auto pb-2">
          {review.images.map((image, i) => (
            <img
              key={i}
              src={image}
              alt={`리뷰 이미지 ${i + 1}`}
              className="w-20 h-20 object-cover rounded-lg"
            />
          ))}
        </div>
      )}

      <div className="text-gray-600">
        {isPreview ? (
          <p className="line-clamp-2">{review.content}</p>
        ) : (
          <>
            {isExpanded ? (
              review.content
            ) : (
              <>
                {review.content.slice(0, 100)}
                {review.content.length > 100 && '...'}
              </>
            )}
            {review.content.length > 100 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="ml-2 text-[#FF800B] hover:text-[#fcb69f] text-sm font-medium"
              >
                {isExpanded ? '접기' : '더보기'}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ReviewCard;
