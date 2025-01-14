import { useState } from 'react';
import { Review } from '../../../types/review.type';
import ReviewCard from './ReviewCard';
interface ReviewPanelProps {
  isOpen: boolean;
  onClose: () => void;
  reviews: Review[];
  sortBy: 'latest' | 'rating';
  onSortChange: (sort: 'latest' | 'rating') => void;
}

const ITEMS_PER_PAGE = 5;

const ReviewPanel = ({
  isOpen,
  onClose,
  reviews,
  sortBy,
  onSortChange,
}: ReviewPanelProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  // 페이지네이션 계산
  const totalPages = Math.ceil(reviews.length / ITEMS_PER_PAGE);
  const currentReviews = reviews.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );
  const STYLES = {
    container: `
      fixed
      inset-0
      z-50
      ${isOpen ? 'visible' : 'invisible'}
    `,

    overlay: `
      absolute
      inset-0
      bg-black
      bg-opacity-50
      transition-opacity
      duration-300
    `,

    panel: `
      absolute
      right-0
      top-0
      h-full
      w-full
      bg-white
      shadow-xl
      transform
      transition-all
      duration-500
      md:top-[10%]
      md:h-[80%]
      md:w-[500px]
      ${isOpen ? 'translate-x-0' : 'translate-x-full'}
    `,

    header: `
      sticky
      top-0
      p-4
      border-b
      border-gray-200
      flex
      justify-between
      items-center
      bg-white
    `,

    headerTitle: `
      text-lg
      font-bold
    `,

    headerCount: `
      text-sm
      text-gray-500
    `,

    controlsContainer: `
      flex
      items-center
      gap-2
      md:gap-4
    `,

    sortSelect: `
      px-3
      py-1.5
      border
      rounded-md
      text-sm
      focus:ring-2
      focus:ring-[#FF800B]
    `,

    closeButton: `
      p-2
      hover:bg-gray-100
      rounded-full
      transition-colors
    `,

    reviewList: `
      p-4
      space-y-4
      overflow-y-auto
      h-[calc(100%-140px)]
    `,

    pagination: `
      absolute
      bottom-0
      left-0
      right-0
      p-4
      border-t
      border-gray-100
      bg-white
    `,

    pageButtons: `
      flex
      justify-center
      gap-2
    `,

    pageButton: (isActive: boolean) => `
      w-8
      h-8
      rounded-full
      transition-colors
      ${
        isActive
          ? 'bg-[#FF800B] text-white'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      }
    `,
  };

  return (
    <div className={STYLES.container}>
      <div
        className={STYLES.overlay}
        style={{ opacity: isOpen ? 1 : 0 }}
        onClick={onClose}
      />

      <div className={STYLES.panel}>
        <div className={STYLES.header}>
          <div>
            <h3 className={STYLES.headerTitle}>리뷰 목록</h3>
            <p className={STYLES.headerCount}>총 {reviews.length}개의 리뷰</p>
          </div>
          <div className={STYLES.controlsContainer}>
            <select
              value={sortBy}
              onChange={(e) =>
                onSortChange(e.target.value as 'latest' | 'rating')
              }
              className={STYLES.sortSelect}
            >
              <option value="latest">최신순</option>
              <option value="rating">평점순</option>
            </select>
            <button onClick={onClose} className={STYLES.closeButton}>
              <span className="text-xl">✕</span>
            </button>
          </div>
        </div>

        <div className={STYLES.reviewList}>
          {currentReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        <div className={STYLES.pagination}>
          <div className={STYLES.pageButtons}>
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx + 1)}
                className={STYLES.pageButton(currentPage === idx + 1)}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewPanel;
