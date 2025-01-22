import { motion } from 'framer-motion';
import { useState } from 'react';

interface SearchPlaceProps {
  onSearch: (keyword: string) => void;
}

const SearchPlace = ({ onSearch }: SearchPlaceProps) => {
  const [keyword, setKeyword] = useState<string>('');

  return (
    <motion.form
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="w-full mt-[3%] max-w-[60%] mx-auto flex gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        onSearch(keyword);
      }}
    >
      <motion.input
        whileFocus={{ scale: 1.02 }}
        type="text"
        className="flex-1 h-12 rounded-lg p-4 shadow-md text-sm md:text-base"
        placeholder="장소를 입력해주세요."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        type="submit"
        className="w-12 h-12 rounded-lg bg-white shadow-md flex items-center justify-center"
      >
        🔍
      </motion.button>
    </motion.form>
  );
};

export default SearchPlace;
