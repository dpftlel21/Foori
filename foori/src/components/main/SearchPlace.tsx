const SearchPlace = () => {
  return (
    <div className="w-full flex justify-center mt-[5%]">
      <input type="text" className="w-[41%] h-[6vh] rounded-md p-[1%]" placeholder="장소를 입력해주세요." />
      <button className="w-[2%] h-[6vh] ml-[1%] rounded-md bg-[#ffff]">🔍</button>
    </div>
  );
};

export default SearchPlace;
