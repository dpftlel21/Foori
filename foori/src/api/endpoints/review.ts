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

// 리뷰 작성
export const createReview = async (
  reviewData: Review,
): Promise<CreateReviewResponse> => {
  const token = cookieStorage.getToken();
  const formData = new FormData();

  formData.append('rating', String(reviewData.rating));
  formData.append('bookingId', String(reviewData.bookingId));
  formData.append('content', reviewData.content);

  // 이미지 파일들
  reviewData.images?.forEach((image) => {
    formData.append('files', image);
  });

  const response = await fetch(`${import.meta.env.VITE_BACK_URL}/api/reviews`, {
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

// 내 리뷰 조회
export const getMyReview = async () => {
  const token = cookieStorage.getToken();
  const response = await fetch(
    `${import.meta.env.VITE_BACK_URL}/api/mypage/my-review`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error('리뷰 조회에 실패했습니다.');
  }

  return response.json();
};

// 리뷰 상세 조회
export const getReviewDetail = async (reviewId: number) => {
  const token = cookieStorage.getToken();
  const response = await fetch(
    `${import.meta.env.VITE_BACK_URL}/api/mypage/my-review/${reviewId}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error('리뷰 상세 조회에 실패했습니다.');
  }

  return response.json();
};
