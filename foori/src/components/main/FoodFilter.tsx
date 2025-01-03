import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

interface FoodFilterProps {
  onCategorySelect: (category: string | null) => void;
}

const FoodFilter = ({ onCategorySelect }: FoodFilterProps) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const categories = {
    today: {
      title: '오늘 뭐 먹지?',
      items: [
        { icon: '🍖', text: '#한식', color: '#F24A4A' },
        { icon: '🍣', text: '#일식', color: '#262CC2' },
        { icon: '🍝', text: '#양식', color: '#1A84A5' },
        { icon: '🍜', text: '#중식', color: '#36A51A' },
        { icon: '🥘', text: '#아시안', color: '#FF6B6B' },
        { icon: '🥗', text: '#샐러드', color: '#4CAF50' },
        { icon: '🍰', text: '#디저트', color: '#FF69B4' },
        { icon: '☕', text: '#카페', color: '#F874A7' },
        { icon: '🍔', text: '#패스트푸드', color: '#b47cdf' },
        { icon: '🍗', text: '#치킨', color: '#ff800b' },
        { icon: '🍲', text: '#분식', color: '#ce2f2f' },
        { icon: '🍺', text: '#술집', color: '#2cad48' },
      ],
    },
    mood: {
      title: '분위기로 찾기',
      items: [
        { icon: '🌅', text: '#오션뷰', color: '#4DACFF' },
        { icon: '🎂', text: '#데이트', color: '#FF69B4' },
        { icon: '💼', text: '#비즈니스', color: '#505050' },
        { icon: '🎂', text: '#기념일', color: '#FFB6C1' },
        { icon: '👨‍👩‍👧‍👦', text: '#가족모임', color: '#FF9800' },
        { icon: '🎮', text: '#혼밥', color: '#9C27B0' },
        { icon: '🌿', text: '#분위기좋은', color: '#66BB6A' },
        { icon: '🎯', text: '#핫플레이스', color: '#FF5252' },
      ],
    },
  } as const;

  const handleCategoryClick = (key: string) => {
    if (expandedCategory === key) {
      setExpandedCategory(null);
      onCategorySelect(null);
    } else {
      setExpandedCategory(key);
    }
  };

  const handleItemClick = (text: string) => {
    const category = text.replace('#', '');
    onCategorySelect(category);
  };

  return (
    <div className="w-full max-w-[60%] mx-auto space-y-4">
      <div className="flex gap-4 w-full">
        {Object.entries(categories).map(([key, category]) => (
          <motion.button
            key={key}
            onClick={() => handleCategoryClick(key)}
            className={`px-5 py-2 rounded-lg shadow-md transition-all text-center w-[180px] text-sm ${
              expandedCategory === key ? 'bg-[#FF800B] text-white' : 'bg-white'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {category.title}
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {expandedCategory && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden w-full"
          >
            <div className="h-[90px] grid grid-cols-4 md:grid-cols-12 gap-2 p-2 bg-white rounded-lg shadow-md">
              {categories[
                expandedCategory as keyof typeof categories
              ].items.map((item, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleItemClick(item.text)}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-50"
                >
                  <span className="text-2xl mb-1">{item.icon}</span>
                  <span
                    className="text-sm whitespace-nowrap"
                    style={{ color: item.color }}
                  >
                    {item.text}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FoodFilter;
