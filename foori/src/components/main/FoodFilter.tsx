import { AnimatePresence, motion } from 'framer-motion';
import { memo, useMemo, useState } from 'react';
import { categoryIcons } from '../../styles/categoryIcons';

interface FoodFilterProps {
  onCategorySelect: (category: string | null) => void;
}

const STYLES = {
  container: `
    w-full
    md:w-[67.5%]
    px-4
    md:px-8
    lg:px-16
    mt-4
  `,
  button: (expanded: boolean) => `
    px-4
    py-2
    rounded-lg
    shadow-lg
    transition-colors
    text-center
    w-[120px]
    text-sm
    font-medium
    ${expanded ? 'bg-[#FF800B] text-white' : 'bg-white hover:bg-gray-50'}
  `,
  dropdown: `
    absolute
    top-12
    left-0
    mt-2
    bg-white
    rounded-lg
    shadow-lg
    overflow-hidden
    w-[280px]
    z-20
  `,
  grid: `
    grid
    grid-cols-3
    gap-3
    p-3
  `,
  categoryButton: `
    flex
    flex-col
    items-center
    justify-center
    p-2
    rounded-lg
    hover:bg-gray-50
    transition-colors
  `,
  icon: `
    text-xl
    mb-1
  `,
  text: (color: string) => `
    text-xs
    whitespace-nowrap
    font-medium
    ${color}
  `,
} as const;

const FoodFilter = memo(({ onCategorySelect }: FoodFilterProps) => {
  const [expandedCategory, setExpandedCategory] = useState<boolean>(false);

  // 카테고리 목록 생성
  const categories = useMemo(
    () =>
      Object.entries(categoryIcons).map(([key, value]) => ({
        icon: value.icon,
        text: `#${key}`,
        color: value.color,
      })),
    [],
  );

  return (
    <div className={STYLES.container}>
      <div className="flex justify-start">
        <div className="relative">
          <motion.button
            onClick={() => {
              setExpandedCategory((prev) => !prev);
              if (expandedCategory) {
                onCategorySelect(null);
              }
            }}
            className={STYLES.button(expandedCategory)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            aria-expanded={expandedCategory}
            aria-controls="category-grid"
          >
            음식 카테고리
          </motion.button>

          <AnimatePresence>
            {expandedCategory && (
              <motion.div
                id="category-grid"
                className={STYLES.dropdown}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <div className={STYLES.grid}>
                  {categories.map(({ icon, text, color }) => (
                    <motion.button
                      key={text}
                      onClick={() => {
                        onCategorySelect(text.replace('#', ''));
                        setExpandedCategory(false);
                      }}
                      className={STYLES.categoryButton}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={`${text.replace('#', '')} 카테고리 선택`}
                    >
                      <span
                        className={STYLES.icon}
                        role="img"
                        aria-label={text.replace('#', '')}
                      >
                        {icon}
                      </span>
                      <span className={STYLES.text(color)}>{text}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
});

FoodFilter.displayName = 'FoodFilter';

export default FoodFilter;
