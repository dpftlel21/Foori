import { useEffect, useState } from 'react';

interface Place {
  id: string;
  place_name: string;
  address_name: string;
  category_name: string;
  x: string;
  y: string;
}

interface MapCenter {
  lat: number;
  lng: number;
}

interface UseKakaoMapProps {
  keyword: string;
  category?: string | null;
}

declare global {
  interface Window {
    kakao: any;
  }
}

export const useKakaoMap = ({ keyword, category }: UseKakaoMapProps) => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<string | null>(null);

  // 강남역 좌표 고정
  const gangnamStation = {
    lat: 37.4980854917,
    lng: 127.0275888336,
  };

  const [center, setCenter] = useState<MapCenter>(gangnamStation);

  useEffect(() => {
    // 카카오맵 SDK 로드
    const loadKakaoMap = () => {
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(() => {
          const ps = new window.kakao.maps.services.Places();

          const options = {
            location: new window.kakao.maps.LatLng(
              gangnamStation.lat,
              gangnamStation.lng,
            ),
            radius: 3000,
          };

          const searchKeyword = category
            ? `강남 ${category}`
            : keyword
            ? `강남 ${keyword}`
            : '강남 맛집';

          ps.keywordSearch(
            searchKeyword,
            (data: Place[], status: any) => {
              if (status === window.kakao.maps.services.Status.OK) {
                let filteredData = data;
                if (category) {
                  filteredData = data.filter((place) => {
                    const categoryName = place.category_name.toLowerCase();
                    const searchCategory = category.toLowerCase();

                    const categoryMatches: { [key: string]: string[] } = {
                      한식: ['한식', '한정식'],
                      일식: ['일식', '초밥', '라멘'],
                      중식: ['중식', '중국집'],
                      양식: ['양식', '이탈리안', '프렌치'],
                      카페: ['카페', '디저트'],
                      분식: ['분식', '떡볶이'],
                      패스트푸드: ['패스트푸드', '햄버거'],
                      치킨: ['치킨', '닭요리'],
                      술집: ['술집', '호프', '바(BAR)'],
                      아시안: ['아시안', '태국', '베트남', '인도'],
                      샐러드: ['샐러드', '샐러드바'],
                      디저트: ['디저트', '베이커리', '케이크'],
                    };

                    return categoryMatches[searchCategory]?.some((cat) =>
                      categoryName.includes(cat.toLowerCase()),
                    );
                  });
                }

                setPlaces(filteredData);
                setCenter(gangnamStation);
              }
            },
            options,
          );
        });
      }
    };

    loadKakaoMap();
  }, [keyword, category]);

  const moveCurrent = () => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => console.error('Error getting location', error),
    );
  };

  return {
    places,
    selectedPlace,
    setSelectedPlace,
    center,
    moveCurrent,
  };
};
