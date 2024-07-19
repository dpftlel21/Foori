import { useEffect, useState } from "react";
import location from "../../assets/images/location.png";

// 카카오 지도 API를 사용하기 위해 글로벌 선언
declare global {
  interface Window {
    kakao: any;
  }
}

const KaKaoMap = () => {
  const [map, setMap] = useState<any>();
  const [marker, setMarker] = useState<any>();

  // 스타일
  const MapContainer = "w-full h-[60%] flex justify-center items-center";
  const Map = "w-[60%] h-[90%] bg-[#fcb69f] border-2 border-solid border-[#b61717] rounded-md";
  const Button = "relative right-[4em] top-[6em] z-10 cursor-pointer";

  // 지도 렌더링
  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new window.kakao.maps.LatLng(37.506502, 127.053617),
      level: 3,
    };
    const kakaoMap = new window.kakao.maps.Map(container, options);
    const kakaoMarker = new window.kakao.maps.Marker({
      position: options.center,
    });
    
    kakaoMarker.setMap(kakaoMap);

    setMap(kakaoMap); // map 상태 설정
    setMarker(kakaoMarker); // marker 상태 설정
  }, []);

  const moveCurrent = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const newCenter = new window.kakao.maps.LatLng(lat, lng);
          
          map.setCenter(newCenter);
          marker.setPosition(newCenter);
        },
        (error) => {
          console.error("Error getting location", error);
        }
      );
    } else {
      console.error("Geolocation not supported");
    }
  };

  return (
    <div className={MapContainer}>
      <div className={Map} id="map"></div>
      <img src={location} className={Button} onClick={moveCurrent} alt="current location button"/>
    </div>
  );
};

export default KaKaoMap;

