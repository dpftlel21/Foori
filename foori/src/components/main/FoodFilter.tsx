const FoodFilter = () => {

  // 버튼 데이터 배열
  const filterItems = [
    { text: '#한식', color: '#F24A4A', hoverColor: 'rgba(242, 74, 74, 0.83)' },
    { text: '#중식', color: '#36A51A', hoverColor: 'rgba(54, 165, 26, 0.83)' },
    { text: '#양식', color: '#1A84A5', hoverColor: 'rgba(26, 132, 165, 0.83)' },
    { text: '#일식', color: '#262CC2', hoverColor: 'rgba(38, 44, 194, 0.83)' },
    { text: '#분식', color: '#AA41EB', hoverColor: 'rgba(170, 65, 235, 0.83)' },
    { text: '#카페', color: '#F874A7', hoverColor: 'rgba(248, 116, 167, 0.83)' }
  ];

  const FilterContainer = "w-full h-[10%] flex justify-center items-center";
  const FilterButton = "w-[6vw] h-[5vh] mx-3 bg-[#fffdfcf2] rounded-md transition duration-500 ease-in-out hover:text-white";

  return (
    <div className={FilterContainer}>
      {filterItems.map((item, index) => (
        <button 
          key={index} 
          className={FilterButton}
          onMouseOver={(e) => {(e.currentTarget as HTMLElement).style.backgroundColor = item.hoverColor;}}
          onMouseOut={(e) => {(e.currentTarget as HTMLElement).style.backgroundColor = 'white'}}
        >
          {item.text}
        </button>
      ))}
    </div>
  );
};

export default FoodFilter;
