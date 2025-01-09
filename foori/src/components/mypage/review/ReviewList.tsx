import { useState } from 'react';
import { Link } from 'react-router-dom';

interface ReviewListProps {
  title: string;
  items: any[];
  emptyMessage: string;
  type: 'available' | 'written';
}

const ReviewList = ({ items, emptyMessage, type }: ReviewListProps) => {
  //onsole.log('items', items);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  return (
    <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
      {items?.length > 0 ? (
        items.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg p-4 transition-all duration-300
              hover:shadow-md border border-gray-100 hover:border-pink-200
              relative group"
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-900">
                  {item.restaurant.name}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {new Date(item.bookingDate).toLocaleDateString('ko-KR')}
                </p>
              </div>

              {type === 'available' && hoveredItem === item.id && (
                <Link
                  to={`/review/${item.id}`}
                  className="bg-[#FF800B] text-white px-4 py-2 rounded-md
                    hover:bg-[#fcb69f] transition duration-300 text-sm font-medium"
                >
                  리뷰 작성하기
                </Link>
              )}

              {type === 'written' && (
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400">
                    {'★'.repeat(item.rating)}
                  </span>
                  <span className="text-gray-400">
                    {'☆'.repeat(5 - item.rating)}
                  </span>
                </div>
              )}
            </div>

            {type === 'written' && (
              <p className="mt-3 text-gray-600 text-sm">{item.content}</p>
            )}
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500 py-8">{emptyMessage}</div>
      )}
    </div>
  );
};

export default ReviewList;
