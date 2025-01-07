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

  return (
    <div
      className={`fixed inset-0 z-50 ${isOpen ? 'visible' : 'invisible'}`}
      style={{ perspective: '1000px' }}
    >
      <div
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
        style={{ opacity: isOpen ? 1 : 0 }}
        onClick={onClose}
      />

      <div
        className={`absolute right-0 top-[10%] h-[80%] w-[500px] bg-white shadow-xl
          transform transition-all duration-500 origin-right
          ${
            isOpen ? 'translate-x-0 rotate-y-0' : 'translate-x-full rotate-y-45'
          }`}
      >
        {/* 헤더 */}
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold">리뷰 목록</h3>
            <p className="text-sm text-gray-500">
              총 {reviews.length}개의 리뷰
            </p>
          </div>
          <div className="flex items-center gap-4">
            <select
              value={sortBy}
              onChange={(e) =>
                onSortChange(e.target.value as 'latest' | 'rating')
              }
              className="px-3 py-1.5 border rounded-md text-sm focus:ring-2 focus:ring-[#FF800B]"
            >
              <option value="latest">최신순</option>
              <option value="rating">평점순</option>
            </select>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <span className="text-xl">✕</span>
            </button>
          </div>
        </div>

        {/* 리뷰 목록 */}
        <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-140px)]">
          {currentReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        {/* 페이지네이션 */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100 bg-white">
          <div className="flex justify-center gap-2">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx + 1)}
                className={`w-8 h-8 rounded-full transition-colors
                  ${
                    currentPage === idx + 1
                      ? 'bg-[#FF800B] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
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
