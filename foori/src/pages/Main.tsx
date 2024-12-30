import { useState } from 'react';
import Header from '../components/header/Header';
import FoodFilter from '../components/main/FoodFilter';
import KaKaoMap from '../components/main/KaKaoMap';
import SearchPlace from '../components/main/SearchPlace';

const Main = () => {
  const [keyword, setKeyword] = useState<string>('');

  const Container =
    'w-full h-screen flex flex-col gap-8 items-center bg-gradient-to-b from-[#ffecd2] to-[#fcb69f]';

  const handleSearch = (searchKeyword: string) => {
    setKeyword(searchKeyword);
  };

  return (
    <main className={Container}>
      <Header />
      <SearchPlace onSearch={handleSearch} />
      <FoodFilter />
      <KaKaoMap keyword={keyword} />
    </main>
  );
};

export default Main;
