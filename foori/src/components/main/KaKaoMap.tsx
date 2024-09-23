import { useEffect, useState } from "react";
import location from "../../assets/images/location.png";

// 카카오 지도 API를 사용하기 위해 글로벌 선언
declare global {
  interface Window {
    kakao: any;
  }
}

interface KaKaoMapProps {
  keyword: string;
}

const KaKaoMap = ({ keyword }: KaKaoMapProps) => {
  const [map, setMap] = useState<any>();
  const [markers, setMarkers] = useState<any[]>([]); // 여러 마커를 저장할 배열

  // 스타일
  const MapContainer = "w-full h-[60%] flex justify-center items-center";
  const Map =
    "w-[60%] h-[90%] bg-[#fcb69f] border-2 border-solid border-[#b61717] rounded-md";
  const Button = "relative right-[4em] top-[6em] z-10 cursor-pointer";

  // 지도 렌더링
  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new window.kakao.maps.LatLng(37.506502, 127.053617), // 기본 위치
      level: 3,
    };
    const kakaoMap = new window.kakao.maps.Map(container, options);

    setMap(kakaoMap); // map 상태 설정

    // 현재 위치 마커 추가
    const kakaoMarker = new window.kakao.maps.Marker({
      position: options.center,
    });
    kakaoMarker.setMap(kakaoMap);
    setMarkers([kakaoMarker]); // 배열로 설정

    // 장소 검색 함수
    const searchPlaces = (keyword: string) => {
      const ps = new window.kakao.maps.services.Places();
      ps.keywordSearch(keyword, placesSearchCB);
    };

    // 장소 검색 콜백 함수
    const placesSearchCB = (data: any, status: any) => {
      if (status === window.kakao.maps.services.Status.OK) {
        // 기존 마커 제거
        markers.forEach((marker) => marker.setMap(null));
        setMarkers([]); // 마커 배열 초기화

        const bounds = new window.kakao.maps.LatLngBounds();
        const newMarkers: any[] = []; // 새로운 마커 저장 배열

        for (let i = 0; i < data.length; i++) {
          const position = new window.kakao.maps.LatLng(data[i].y, data[i].x);
          const marker = new window.kakao.maps.Marker({
            position,
            map: kakaoMap,
          });
          newMarkers.push(marker);
          bounds.extend(position);

          // 마커 클릭 이벤트 등록
          const infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });
          window.kakao.maps.event.addListener(marker, "click", () => {
            infowindow.setContent(
              '<div style="padding:5px;font-size:12px;">' +
                data[i].place_name +
                "</div>"
            );
            infowindow.open(kakaoMap, marker);
          });
        }

        kakaoMap.setBounds(bounds); // 검색 결과에 맞춰 지도의 범위를 조정
        setMarkers(newMarkers); // 새로운 마커 상태 설정
      } else {
        console.error("Place search failed", status);
      }
    };

    // 키워드가 변경되면 장소 검색 실행
    if (keyword) {
      searchPlaces(keyword);
    }
  }, [keyword]); // keyword가 변경될 때마다 useEffect 실행

  // 현재 위치로 이동
  const moveCurrent = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const newCenter = new window.kakao.maps.LatLng(lat, lng);

          map.setCenter(newCenter);

          // 현재 위치 마커 업데이트
          markers[0].setPosition(newCenter);
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
      <img
        src={location}
        className={Button}
        onClick={moveCurrent}
        alt="current location button"
      />
    </div>
  );
};

export default KaKaoMap;
