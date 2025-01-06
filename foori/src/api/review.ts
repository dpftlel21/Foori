import { cookieStorage } from './cookies';

interface Review {
  rating: number;
  content: string;
  bookingId: number;
  images?: File[]; // optional로 변경
}

// 리뷰 작성
export const writeReview = async (review: Review) => {
  const token = cookieStorage.getToken();

  console.log('Writing review for booking:', review.bookingId);

  const reviewData = { ...review };
  if (!reviewData.images?.length) {
    delete reviewData.images;
  }

  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACK_URL}/api/reviews`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(reviewData),
      },
    );

    console.log('review response :', response);

    return response;
  } catch (error) {
    console.error('Review submission failed:', error);
    throw error;
  }
};

// 식당 리뷰 조회
export const getReview = async (restaurantId: number) => {
  const token = cookieStorage.getToken();

  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_BACK_URL
      }/api/place/${restaurantId}/reviews-count`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const data = await response.json();
    console.log('data :', data);

    return data;
  } catch (error) {
    console.error('Review submission failed:', error);
  }
};

// 내 리뷰 조회
export const getMyReview = async () => {
  const token = cookieStorage.getToken();

  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACK_URL}/api/mypage/my-review`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const data = await response.json();
    console.log('my review :', data);

    return data;
  } catch (error) {
    console.error('Review submission failed:', error);
  }
};

// 리뷰 상세 조회
export const getReviewDetail = async (reviewId: number) => {
  const token = cookieStorage.getToken();

  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACK_URL}/api/mypage/my-review/${reviewId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const data = await response.json();
    console.log('review detail :', data);

    return data;
  } catch (error) {
    console.error('Review submission failed:', error);
  }
};
