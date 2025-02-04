import { useQuery } from 'react-query';
import { getMyReview, getReviewDetail } from '../../api/endpoints/review';

export const useReviews = (reviewId?: number) => {
  const reviewsQuery = useQuery({
    queryKey: ['reviews'],
    queryFn: getMyReview,
  });

  const detailQuery = useQuery({
    queryKey: ['review', reviewId],
    queryFn: () => getReviewDetail(reviewId!),
    enabled: !!reviewId,
    staleTime: 30000,
    cacheTime: 5 * 60 * 1000,
  });

  return {
    reviews: reviewsQuery.data,
    reviewDetail: detailQuery.data,
    isLoading: reviewsQuery.isLoading || detailQuery.isLoading,
    error: reviewsQuery.error || detailQuery.error,
  };
};
