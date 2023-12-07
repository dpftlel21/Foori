import { useEffect } from "react";

// kakao 글로벌 선언
declare global {
  interface Window {
    kakao: any;
  }
}

const KaKaoMap = () => {
  // 스타일
  const MapContainer = "w-full h-[60%] flex justify-center items-center ";
  const Map =
    "w-[60%] h-[90%] bg-[#fcb69f] border-2 border-solid border-[#b61717] rounded-md";

  // 지도 렌더링
  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new window.kakao.maps.LatLng(37.506502, 127.053617),
      level: 3,
    };
    const map = new window.kakao.maps.Map(container, options);
  }, []);

  return (
    <div className={MapContainer}>
      <div className={Map} id="map"></div>
    </div>
  );
};

export default KaKaoMap;
