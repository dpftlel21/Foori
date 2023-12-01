const FoodFilter = () => {
  const FilterContainer = "w-full h-[10%] flex justify-center items-center";
  const FilterButton =
    "w-[5%] h-[25%] mx-3 bg-[#fffdfcf2] rounded-md hover:bg-[#fcb69f] transition duration-500 ease-in-out";

  return (
    <div className={FilterContainer}>
      <button className={FilterButton}>#한식</button>
      <button className={FilterButton}>#중식</button>
      <button className={FilterButton}>#양식</button>
      <button className={FilterButton}>#일식</button>
      <button className={FilterButton}>#분식</button>
      <button className={FilterButton}>#카페</button>
    </div>
  );
};

export default FoodFilter;
