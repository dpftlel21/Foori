import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

interface FoodFilterProps {
  onCategorySelect: (category: string | null) => void;
}

const FoodFilter = ({ onCategorySelect }: FoodFilterProps) => {
  const [expandedCategory, setExpandedCategory] = useState<boolean>(false);

  // 카테고리 아이콘
  const categories = [
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
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 25,
      },
    },
  };

  const handleCategoryClick = () => {
    setExpandedCategory(!expandedCategory);
    if (expandedCategory) {
      onCategorySelect(null);
    }
  };

  const handleItemClick = (text: string) => {
    const category = text.replace('#', '');
    onCategorySelect(category);
  };

  return (
    <motion.div
      className="w-full max-w-[90%] md:max-w-[60%] mx-auto space-y-4 p-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.button
        onClick={handleCategoryClick}
        className={`
          px-5 py-2
          rounded-lg
          shadow-md
          transition-all
          text-center
          w-full
          md:w-[180px]
          text-sm
          font-medium
          ${
            expandedCategory
              ? 'bg-[#FF800B] text-white'
              : 'bg-white hover:bg-gray-50'
          }
        `}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        음식 카테고리
      </motion.button>

      <AnimatePresence>
        {expandedCategory && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden w-full"
          >
            <motion.div
              className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-2 p-4 bg-white rounded-lg shadow-md"
              variants={containerVariants}
            >
              {categories.map((item, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleItemClick(item.text)}
                  variants={itemVariants}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <span className="text-2xl mb-1">{item.icon}</span>
                  <span
                    className="text-xs md:text-sm whitespace-nowrap font-medium"
                    style={{ color: item.color }}
                  >
                    {item.text}
                  </span>
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FoodFilter;
