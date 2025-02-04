import { FiX } from 'react-icons/fi';
import { useReviews } from '../../../hooks/query/useGetReview';

const STYLES = {
  container: `
    mt-4
    bg-gray-50
    rounded-lg
    p-4
    relative
    animate-fadeIn
  `,
  closeButton: `
    absolute
    right-4
    top-4
    text-gray-400
    hover:text-gray-600
    transition-colors
  `,
  content: `
    space-y-4
  `,
  ratingContainer: `
    flex
    items-center
    gap-2
    flex-wrap
  `,
  rating: `
    flex
    items-center
    text-yellow-400
  `,
  date: `
    text-sm
    text-gray-500
  `,
  reviewText: `
    text-gray-700
    whitespace-pre-line
    text-sm
    md:text-base
  `,
  imageGrid: `
    grid
    grid-cols-1
    sm:grid-cols-2
    md:grid-cols-3
    gap-2
  `,
  image: `
    w-full
    h-32
    md:h-40
    object-cover
    rounded-lg
    transition-transform
    hover:scale-105
    cursor-pointer
  `,
} as const;

interface ReviewDetailProps {
  reviewId: number;
  onClose: () => void;
}

const ReviewDetail = ({ reviewId, onClose }: ReviewDetailProps) => {
  // 리뷰 상세 조회
  const { reviewDetail, isLoading } = useReviews(reviewId);
  //console.log(reviewDetail);

  if (isLoading) return <div className="text-center py-4">로딩중...</div>;

  return (
    <div className={STYLES.container}>
      <button onClick={onClose} className={STYLES.closeButton}>
        <FiX size={20} />
      </button>

      <div className={STYLES.content}>
        <div className={STYLES.ratingContainer}>
          <div className={STYLES.rating}>
            {'★'.repeat(reviewDetail.rating)}
            <span className="text-gray-300">
              {'★'.repeat(5 - reviewDetail.rating)}
            </span>
          </div>
          <span className={STYLES.date}>
            {new Date(reviewDetail.createdAt).toLocaleDateString('ko-KR')}
          </span>
        </div>

        <p className={STYLES.reviewText}>{reviewDetail.content}</p>

        {reviewDetail.images && reviewDetail.images.length > 0 && (
          <div className={STYLES.imageGrid}>
            {reviewDetail.images.map((image: string, index: number) => (
              <img
                key={index}
                src={image}
                alt={`리뷰 이미지 ${index + 1}`}
                className={STYLES.image}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewDetail;
