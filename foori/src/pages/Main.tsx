import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/header/Header';
import FoodFilter from '../components/main/FoodFilter';
import KaKaoMap from '../components/main/KaKaoMap';
import SearchPlace from '../components/main/SearchPlace';

interface LocationState {
  selectedCategory?: string;
}

const Main = () => {
  const location = useLocation();
  const [keyword, setKeyword] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    () => {
      // 초기값으로 location.state 확인
      const state = location.state as LocationState;
      return state?.selectedCategory || null;
    },
  );

  // location.state가 변경될 때마다 카테고리 업데이트
  useEffect(() => {
    const state = location.state as LocationState;
    if (state?.selectedCategory) {
      setSelectedCategory(state.selectedCategory);
      // state 초기화
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleSearch = (searchKeyword: string) => {
    setKeyword(searchKeyword);
    setSelectedCategory(null);
  };

  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);
    setKeyword('');
  };

  // 디버깅용 로그
  //console.log('Current category:', selectedCategory);
  //console.log('Current location state:', location.state);

  return (
    <main className="w-full h-screen flex flex-col gap-8 items-center bg-gradient-to-b from-[#ffecd2] to-[#fcb69f]">
      <Header />
      <SearchPlace onSearch={handleSearch} />
      <FoodFilter onCategorySelect={handleCategorySelect} />
      <KaKaoMap keyword={keyword} category={selectedCategory} />
    </main>
  );
};

export default Main;
