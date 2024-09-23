import { useState } from "react";
import Header from "src/components/header/Header";
import FoodFilter from "src/components/main/FoodFilter";
import KaKaoMap from "src/components/main/KaKaoMap";
import SearchPlace from "src/components/main/SearchPlace";

const Main = () => {
  const [keyword, setKeyword] = useState<string>("");

  const Container =
    "w-full h-screen bg-gradient-to-b from-[#ffecd2] to-[#fcb69f]";

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
