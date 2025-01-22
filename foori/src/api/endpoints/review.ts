import { cookieStorage } from '../utils/cookies';

interface CreateReviewResponse {
  id: number;
  rating: number;
  content: string;
  images: File[];
  createdAt: string;
}

interface Review {
  rating: number;
  content: string;
  images: File[];
  bookingId: number;
}

export const createReview = async (
  reviewData: Review,
): Promise<CreateReviewResponse> => {
  const token = cookieStorage.getToken();
  const formData = new FormData();

  // 숫자 타입임을 명시하는 추가 필드
  formData.append('rating', String(reviewData.rating));
  formData.append('bookingId', String(reviewData.bookingId));
  formData.append('content', reviewData.content);

  // 이미지 파일들
  reviewData.images?.forEach((image) => {
    formData.append('files', image);
  });

  const response = await fetch(`api/reviews`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error('리뷰 작성에 실패했습니다.');
  }

  return response.json();
};
