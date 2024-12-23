import { Map } from 'react-kakao-maps-sdk';
import { useNavigate } from 'react-router-dom';
import { useCrawledData } from '../../api/crawledData';
import location from '../../assets/images/location.png';
import { useKakaoMap } from '../../hooks/useKakaoMap';
import MarkerOverlay from './marker/MarkerOverlay';

interface KaKaoMapProps {
  keyword: string;
}

interface CrawledData {
  id: string;
  name: string;
  category: string;
  address: string;
  open_days: string;
  open_time: string;
  close_time: string;
  phone: string;
  x: string;
  y: string;
}

const KaKaoMap = ({ keyword }: KaKaoMapProps) => {
  // 스타일
  const MapContainer = 'w-full h-[60%] flex justify-center items-center';
  const MapBox =
    'w-[60%] h-[90%] bg-[#fcb69f] border-2 border-solid border-[#b61717] rounded-md';
  const Button = 'relative right-[4em] top-[6em] z-10 cursor-pointer';

  // 카카오맵 데이터
  const { places, selectedPlace, setSelectedPlace, center, moveCurrent } =
    useKakaoMap(keyword);
  // 크롤링 한 데이터
  const { data } = useCrawledData();
  // 크롤링 데이터와 카카오맵 데이터 매칭
  const matchedPlaces = places.filter((place) =>
    data?.some(
      (crawledData: CrawledData) => crawledData.name === place.place_name,
    ),
  );

  const navigate = useNavigate();

  const handleReservation = (placeId: string) => {
    // 카카오맵 place 데이터 찾기
    const kakaoPlace = matchedPlaces.find((p) => p.id === placeId);

    if (kakaoPlace) {
      // 매칭되는 크롤링 데이터 찾기
      const crawledPlace = data?.find(
        (item: CrawledData) => item.name === kakaoPlace.place_name,
      );

      if (crawledPlace) {
        console.log('예약하기:', crawledPlace);
        navigate(`/detail/${crawledPlace.id}`, {
          state: {
            placeInfo: crawledPlace,
          },
        });
      }
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
          {matchedPlaces.map((place) => (
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
