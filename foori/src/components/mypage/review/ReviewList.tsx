import { useState } from 'react';
import { FiChevronDown, FiChevronUp, FiEdit3 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import ReviewDetail from './ReviewDetail';

interface ReviewItem {
  id: number;
  bookingDate: string;
  restaurant: {
    name: string;
  };
  status: 'pending' | 'completed';
  content?: string;
  rating?: number;
  images?: string[];
}

interface ReviewListProps {
  items: ReviewItem[];
  emptyMessage: string;
}

const STYLES = {
  container: `
    space-y-4
  `,
  listContainer: `
    space-y-3
    max-h-[400px]
    md:max-h-[600px]
    overflow-y-auto
    pr-2
    scrollbar-thin
    scrollbar-thumb-gray-300
    scrollbar-track-gray-100
  `,
  reviewItem: (type: string, isHovered: boolean) => `
    bg-white
    rounded-lg
    p-3
    md:p-4
    transition-all
    duration-300
    relative
    group
    ${
      type === 'pending'
        ? `border-l-4 border-l-yellow-400 border border-yellow-100
         ${isHovered ? 'border-yellow-200 shadow-md' : ''}`
        : `border-l-4 border-l-green-400 border border-green-100
         ${isHovered ? 'border-green-200 shadow-md' : ''}`
    }
  `,
  reviewHeader: `
    flex
    justify-between
    items-start
    gap-2
  `,
  restaurantInfo: `
    flex
    items-center
    gap-2
  `,
  restaurantName: `
    font-medium
    text-gray-900
    text-sm
    md:text-base
  `,
  statusBadge: (status: 'pending' | 'completed') => `
    text-xs
    px-2
    py-1
    rounded-full
    ${
      status === 'pending'
        ? 'bg-yellow-100 text-yellow-800'
        : 'bg-green-100 text-green-800'
    }
  `,
  date: `
    text-xs
    md:text-sm
    text-gray-500
    mt-1
  `,
  writeButton: (isHovered: boolean) => `
    flex
    items-center
    gap-2
    px-3
    md:px-4
    py-1.5
    md:py-2
    rounded-md
    transition
    duration-300
    text-xs
    md:text-sm
    font-medium
    ${isHovered ? 'bg-yellow-400 text-white' : 'bg-yellow-50 text-yellow-600'}
  `,
  emptyMessage: `
    text-center
    text-gray-500
    py-6
    text-sm
    md:text-base
  `,
} as const;

const ReviewList = ({ items, emptyMessage }: ReviewListProps) => {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [expandedReview, setExpandedReview] = useState<number | null>(null);

  const toggleReview = (reviewId: number) => {
    setExpandedReview(expandedReview === reviewId ? null : reviewId);
  };

  return (
    <div className={STYLES.container}>
      <div className={STYLES.listContainer}>
        {items.length > 0 ? (
          items.map((item) => (
            <div key={item.id}>
              <div
                className={STYLES.reviewItem(
                  item.status,
                  hoveredItem === item.id,
                )}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div className={STYLES.reviewHeader}>
                  <div
                    className="flex-1 cursor-pointer"
                    onClick={() =>
                      item.status === 'completed' && toggleReview(item.id)
                    }
                  >
                    <div className={STYLES.restaurantInfo}>
                      <h3 className={STYLES.restaurantName}>
                        {item.restaurant.name}
                      </h3>
                      <span className={STYLES.statusBadge(item.status)}>
                        {item.status === 'pending' ? '작성 대기' : '작성 완료'}
                      </span>
                      {item.status === 'completed' && (
                        <button className="ml-auto text-gray-400">
                          {expandedReview === item.id ? (
                            <FiChevronUp size={16} className="md:w-5 md:h-5" />
                          ) : (
                            <FiChevronDown
                              size={16}
                              className="md:w-5 md:h-5"
                            />
                          )}
                        </button>
                      )}
                    </div>
                    <p className={STYLES.date}>
                      방문일:{' '}
                      {new Date(item.bookingDate).toLocaleDateString('ko-KR')}
                    </p>
                  </div>

                  {item.status === 'pending' && (
                    <Link
                      to={`/review/${item.id}`}
                      className={STYLES.writeButton(hoveredItem === item.id)}
                    >
                      <FiEdit3 className="w-3 h-3 md:w-4 md:h-4" />
                      리뷰 작성
                    </Link>
                  )}
                </div>
              </div>

              {item.status === 'completed' && expandedReview === item.id && (
                <ReviewDetail
                  reviewId={item.id}
                  onClose={() => setExpandedReview(null)}
                />
              )}
            </div>
          ))
        ) : (
          <div className={STYLES.emptyMessage}>{emptyMessage}</div>
        )}
      </div>
    </div>
  );
};

export default ReviewList;
