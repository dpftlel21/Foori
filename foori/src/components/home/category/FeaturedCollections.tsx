import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const FeaturedCollections = () => {
  const navigate = useNavigate();

  const todayCategories = [
    { icon: '🍖', name: '한식' },
    { icon: '🍣', name: '일식' },
    { icon: '🍝', name: '양식' },
    { icon: '🥘', name: '중식' },
    { icon: '🍜', name: '아시안' },
    { icon: '🥗', name: '샐러드' },
    { icon: '🍰', name: '디저트' },
    { icon: '☕', name: '카페' },
    { icon: '🍔', name: '패스트푸드' },
    { icon: '🍗', name: '치킨' },
    { icon: '🍲', name: '분식' },
    { icon: '🍺', name: '술집' },
  ];

  const moodCategories = [
    { icon: '🌅', name: '오션뷰' },
    { icon: '🎂', name: '데이트' },
    { icon: '💼', name: '비즈니스' },
    { icon: '🎂', name: '기념일' },
    { icon: '👨‍👩‍👧‍👦', name: '가족모임' },
    { icon: '🎮', name: '혼밥' },
    { icon: '🌿', name: '분위기좋은' },
    { icon: '🎯', name: '핫플레이스' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const handleCategoryClick = (category: string) => {
    navigate('/main', {
      state: { selectedCategory: category },
      replace: true,
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
      {/* 오늘 뭐 먹지? 섹션 */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <motion.h2
          className="text-2xl font-bold mb-6"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          오늘 뭐 먹지? 🤔
        </motion.h2>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
          {todayCategories.map((category, index) => (
            <motion.button
              key={index}
              variants={itemVariants}
              onClick={() => handleCategoryClick(category.name)}
              whileHover={{
                scale: 1.05,
                backgroundColor: '#FFF5E9',
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center justify-center p-4 rounded-xl bg-white shadow-sm"
            >
              <motion.span
                className="text-2xl mb-2"
                whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
              >
                {category.icon}
              </motion.span>
              <span className="text-sm font-medium text-gray-700">
                {category.name}
              </span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* 분위기로 찾기 섹션 */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <motion.h2
          className="text-2xl font-bold mb-6"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          분위기로 찾기 🌟
        </motion.h2>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
          {moodCategories.map((category, index) => (
            <motion.button
              key={index}
              variants={itemVariants}
              onClick={() => handleCategoryClick(category.name)}
              whileHover={{
                scale: 1.05,
                backgroundColor: '#FFF5E9',
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center justify-center p-4 rounded-xl bg-white shadow-sm"
            >
              <motion.span
                className="text-2xl mb-2"
                whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
              >
                {category.icon}
              </motion.span>
              <span className="text-sm font-medium text-gray-700">
                {category.name}
              </span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default FeaturedCollections;
