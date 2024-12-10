import { useState, useEffect } from 'react';

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

export const useKakaoMap = (keyword: string) => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<string | null>(null);
  const [center, setCenter] = useState<MapCenter>({
    lat: 37.506502,
    lng: 127.053617,
  });

  // 키워드 검색
  useEffect(() => {
    if (!keyword) return;

    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(keyword, (data: Place[], status: any) => {
      if (status === kakao.maps.services.Status.OK) {
        setPlaces(data);
        
        console.log("getData",data);

        // 검색된 장소들의 중심점으로 지도 이동
        if (data.length > 0) {
          const bounds = new kakao.maps.LatLngBounds();
          data.forEach((place) => {
            bounds.extend(new kakao.maps.LatLng(
              parseFloat(place.y),
              parseFloat(place.x)
            ));
          });
          
          const centerLat = (bounds.getNorthEast().getLat() + bounds.getSouthWest().getLat()) / 2;
          const centerLng = (bounds.getNorthEast().getLng() + bounds.getSouthWest().getLng()) / 2;
          
          setCenter({ lat: centerLat, lng: centerLng });
        }
      }
    });
  }, [keyword]);

  // 현재 위치로 이동
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
