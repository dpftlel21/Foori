const KaKaoMap = () => {
  const MapContainer = "w-full h-[60%] flex justify-center items-center ";

  const Map =
    "w-[60%] h-[90%] bg-[#fcb69f] border-2 border-solid border-[#b61717] rounded-md";
  return (
    <div className={MapContainer}>
      <div className={Map}></div>
    </div>
  );
};

export default KaKaoMap;
