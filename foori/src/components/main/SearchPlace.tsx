import { useState } from "react";

interface SearchPlaceProps {
  onSearch: (keyword: string) => void;
}

const SearchPlace = ({ onSearch }: SearchPlaceProps) => {
  const [keyword, setKeyword] = useState<string>("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(keyword); // 검색 키워드를 부모 컴포넌트로 전달
  };

  return (
    <form
      className="w-full flex justify-center mt-[5%]"
      onSubmit={handleSearch}
    >
      <input
        type="text"
        className="w-[41%] h-[6vh] rounded-md p-[1%]"
        placeholder="장소를 입력해주세요."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button
        type="submit"
        className="w-[2%] h-[6vh] ml-[1%] rounded-md bg-[#ffff]"
      >
        🔍
      </button>
    </form>
  );
};

export default SearchPlace;
