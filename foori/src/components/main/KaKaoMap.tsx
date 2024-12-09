import { Map } from 'react-kakao-maps-sdk';
import location from '../../assets/images/location.png';
import { useKakaoMap } from '../../hooks/useKakaoMap';
import MarkerOverlay from './marker/MarkerOverlay';

interface KaKaoMapProps {
  keyword: string;
}

const KaKaoMap = ({ keyword }: KaKaoMapProps) => {
  const { places, selectedPlace, setSelectedPlace, center, moveCurrent } =
    useKakaoMap(keyword);

  // 스타일
  const MapContainer = 'w-full h-[60%] flex justify-center items-center';
  const MapBox = 'w-[60%] h-[90%] bg-[#fcb69f] border-2 border-solid border-[#b61717] rounded-md';
  const Button = 'relative right-[4em] top-[6em] z-10 cursor-pointer';

  const handleReservation = (placeId: string) => {
    const place = places.find((p) => p.id === placeId);
    
    if (place) {
      console.log('예약하기:', place.place_name);
      // 예약 로직 구현
    }
  };

  return (
    <div className={MapContainer}>
      <div className={MapBox}>
        <Map
          center={center}
          style={{ width: '100%', height: '100%', borderRadius: '6px' }}
          level={3}
        >
          {places.map((place) => (
            <MarkerOverlay
              key={place.id}
              place={place}
              selectedPlace={selectedPlace}
              onSelect={setSelectedPlace}
              onReservation={handleReservation}
            />
          ))}
        </Map>
      </div>
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
