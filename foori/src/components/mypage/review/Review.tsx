import { useState } from 'react';
import { useBookings } from '../../../hooks/query/useGetBooking';
import { useReviews } from '../../../hooks/query/useGetReview';
import ReviewList from './ReviewList';

interface ReviewData {
  id: number;
  content: string;
  rating: number;
  createdAt: string;
  images: string[];
  bookingId: number;
}

const ITEMS_PER_PAGE = 10;

const FILTER_OPTIONS = [
  { value: 'all', label: '전체' },
  { value: 'pending', label: '작성 대기' },
  { value: 'completed', label: '작성 완료' },
] as const;

const SORT_OPTIONS = [
  { value: 'latest', label: '최신순' },
  { value: 'oldest', label: '오래된순' },
  { value: 'nameAsc', label: '가게명 오름차순' },
  { value: 'nameDesc', label: '가게명 내림차순' },
] as const;

const STYLES = {
  container: `
    w-full
    h-full
    bg-gray-50
    p-4
    md:p-6
  `,
  content: `
    max-w-7xl
    mx-auto
    bg-white
    rounded-xl
    shadow-xl
    p-6
    md:p-8
  `,
  header: `
    flex
    flex-col
    md:flex-row
    md:justify-between
    md:items-center
    gap-4
    mb-8
  `,
  titleWrapper: `
    flex
    items-center
    gap-2
  `,
  title: `
    text-2xl
    font-bold
    text-gray-800
  `,
  count: `
    text-lg
    text-gray-500
  `,
  controls: `
    flex
    gap-2
  `,
  select: `
    px-4
    py-2
    text-sm
    font-medium
    text-gray-700
    bg-white
    border
    border-gray-300
    rounded-lg
    hover:bg-gray-50
    transition-colors
    focus:outline-none
    focus:ring-2
    focus:ring-blue-500
  `,
  pagination: `
    flex
    justify-center
    gap-2
    mt-8
  `,
  pageButton: `
    px-3
    py-1
    text-sm
    rounded-md
    border
    border-gray-300
    hover:bg-gray-50
    transition-colors
  `,
  activePageButton: `
    bg-blue-500
    text-white
    border-blue-500
    hover:bg-blue-600
  `,
} as const;

const Review = () => {
  const { bookings } = useBookings();
  const { reviews } = useReviews();
  const [filter, setFilter] =
    useState<(typeof FILTER_OPTIONS)[number]['value']>('all');
  const [sortOption, setSortOption] =
    useState<(typeof SORT_OPTIONS)[number]['value']>('latest');
  const [currentPage, setCurrentPage] = useState(1);

  // 모든 리뷰 데이터 결합
  const allReviews = [
    // 작성 대기 리뷰
    ...(bookings
      ?.filter(
        (booking) =>
          booking.status === 3 &&
          !booking.isReviewed &&
          booking.restaurant?.name, // restaurant 데이터가 있는 경우만
      )
      .map((booking) => ({
        id: booking.id,
        bookingDate: booking.bookingDate,
        restaurant: {
          name: booking.restaurant.name,
        },
        status: 'pending' as const,
      })) || []),
    // 작성 완료 리뷰
    ...(reviews
      ?.map((review: ReviewData) => {
        const booking = bookings?.find((b) => b.id === review.bookingId);
        if (!booking?.restaurant?.name) return null; // restaurant 데이터가 없으면 제외

        return {
          ...review,
          bookingDate: booking.bookingDate,
          restaurant: {
            name: booking.restaurant.name,
          },
          status: 'completed' as const,
        };
      })
      .filter(Boolean) || []), // null 값 제거
  ];

  // 필터링
  const filteredReviews = allReviews.filter((review) =>
    filter === 'all' ? true : review.status === filter,
  );

  // 정렬
  const sortedReviews = [...filteredReviews].sort((a, b) => {
    switch (sortOption) {
      case 'latest':
        return (
          new Date(b.bookingDate).getTime() - new Date(a.bookingDate).getTime()
        );
      case 'oldest':
        return (
          new Date(a.bookingDate).getTime() - new Date(b.bookingDate).getTime()
        );
      case 'nameAsc':
        return a.restaurant.name.localeCompare(b.restaurant.name);
      case 'nameDesc':
        return b.restaurant.name.localeCompare(a.restaurant.name);
      default:
        return 0;
    }
  });

  // 페이지네이션
  const totalPages = Math.ceil(sortedReviews.length / ITEMS_PER_PAGE);
  const currentReviews = sortedReviews.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  return (
    <div className={STYLES.container}>
      <div className={STYLES.content}>
        <div className={STYLES.header}>
          <div className={STYLES.titleWrapper}>
            <h1 className={STYLES.title}>나의 리뷰</h1>
            <span className={STYLES.count}>({filteredReviews.length}개)</span>
          </div>
          <div className={STYLES.controls}>
            <select
              value={filter}
              onChange={(e) => {
                setFilter(e.target.value as typeof filter);
                setCurrentPage(1);
              }}
              className={STYLES.select}
            >
              {FILTER_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <select
              value={sortOption}
              onChange={(e) => {
                setSortOption(e.target.value as typeof sortOption);
                setCurrentPage(1);
              }}
              className={STYLES.select}
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <ReviewList
          items={currentReviews}
          emptyMessage="리뷰 내역이 없습니다."
        />

        {totalPages > 1 && (
          <div className={STYLES.pagination}>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={`${STYLES.pageButton} ${
                  currentPage === i + 1 ? STYLES.activePageButton : ''
                }`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Review;
