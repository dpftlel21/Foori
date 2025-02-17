import { motion } from 'framer-motion';
import { memo, useCallback, useState } from 'react';

interface SearchPlaceProps {
  onSearch: (keyword: string) => void;
}

const SearchPlace = memo(({ onSearch }: SearchPlaceProps) => {
  const [keyword, setKeyword] = useState<string>('');

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (keyword.trim()) {
        onSearch(keyword);
      }
    },
    [keyword, onSearch],
  );

  return (
    <motion.form
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full mt-[3rem] md:max-w-[65%] px-4 md:px-0 flex gap-2"
      onSubmit={handleSubmit}
      role="search"
      aria-label="장소 검색"
    >
      <motion.input
        whileFocus={{ scale: 1.01 }}
        type="search"
        className="flex-1 h-12 rounded-lg p-4 shadow-md text-sm md:text-base"
        placeholder="장소를 입력해주세요."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        aria-label="검색어 입력"
      />
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="submit"
        className="w-12 h-12 rounded-lg bg-white shadow-md flex items-center justify-center"
        aria-label="검색"
      >
        <span role="img" aria-label="검색">
          🔍
        </span>
      </motion.button>
    </motion.form>
  );
});

SearchPlace.displayName = 'SearchPlace';

export default SearchPlace;
