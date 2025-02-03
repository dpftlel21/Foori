import { motion } from 'framer-motion';
import { Map } from 'react-kakao-maps-sdk';
import { useNavigate } from 'react-router-dom';
import location from '../../assets/images/location.png';
import { useCrawledData } from '../../hooks/query/useCrawledData';
import { useKakaoMap } from '../../hooks/useKakaoMap';
import MarkerOverlay from './marker/MarkerOverlay';

interface KaKaoMapProps {
  keyword: string;
  category: string | null;
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

const KaKaoMap = ({ keyword, category }: KaKaoMapProps) => {
  const {
    places,
    selectedPlace,
    setSelectedPlace,
    center,
    moveCurrent,
    isLoaded,
  } = useKakaoMap({ keyword, category });
  const { data } = useCrawledData();

  const navigate = useNavigate();

  // 로딩 상태 처리
  if (!isLoaded) {
    return (
      <div className="w-full h-[50vh] flex items-center justify-center">
        <div>카카오맵을 불러오는 중입니다...</div>
      </div>
    );
  }

  // 크롤링 데이터와 카카오맵 데이터 매칭
  const matchedPlaces = places.filter((place) =>
    data?.some(
      (crawledData: CrawledData) => crawledData.name === place.place_name,
    ),
  );

  const handleReservation = (placeId: string) => {
    const kakaoPlace = matchedPlaces.find((p) => p.id === placeId);
    if (kakaoPlace) {
      const crawledPlace = data?.find(
        (item: CrawledData) => item.name === kakaoPlace.place_name,
      );
      if (crawledPlace) {
        navigate(`/detail/${crawledPlace.id}`);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="w-full min-h-[400px] h-[50vh] md:h-[60vh] px-4 md:px-8 lg:px-16"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full h-full max-w-5xl mx-auto"
      >
        <div className="w-full h-full rounded-lg overflow-hidden shadow-lg border-2 border-[#fcb69f]">
          <Map
            center={center}
            style={{ width: '100%', height: '100%' }}
            level={3}
            className="rounded-lg"
          >
            {matchedPlaces.map((place) => (
              <motion.div
                key={place.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <MarkerOverlay
                  place={place}
                  selectedPlace={selectedPlace}
                  onSelect={setSelectedPlace}
                  onReservation={handleReservation}
                />
              </motion.div>
            ))}
          </Map>
        </div>

        <motion.button
          whileHover={{ scale: 1.1, rotate: 360 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.3 }}
          onClick={moveCurrent}
          className="absolute bottom-4 right-4 md:bottom-8 md:right-8
                     w-10 h-10 md:w-12 md:h-12
                     bg-white rounded-full shadow-lg
                     flex items-center justify-center
                     hover:shadow-xl z-10"
        >
          <img
            src={location}
            alt="current location"
            className="w-6 h-6 md:w-8 md:h-8"
          />
        </motion.button>

        {places.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75"
          >
            <div className="text-lg text-gray-600">
              {keyword || category ? '검색 중...' : '장소를 검색해주세요'}
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default KaKaoMap;
