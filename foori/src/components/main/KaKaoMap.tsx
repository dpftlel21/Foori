import { AnimatePresence, motion } from 'framer-motion';
import { memo, useCallback, useMemo } from 'react';
import { Map } from 'react-kakao-maps-sdk';
import { useNavigate } from 'react-router-dom';
import { useCrawledData } from '../../hooks/query/useGetCrawledData';
import { useKakaoMap } from '../../hooks/useKakaoMap';
import MapControls from './MapControls';
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

const KaKaoMap = memo(({ keyword, category }: KaKaoMapProps) => {
  const {
    places,
    selectedPlace,
    setSelectedPlace,
    center,
    isLoaded,
    zoomLevel,
    zoomIn,
    zoomOut,
  } = useKakaoMap({ keyword, category });

  const { data } = useCrawledData();

  const navigate = useNavigate();

  // 카카오맵에서 검색된 장소와 크롤링된 장소를 비교하여 일치하는 장소를 찾음
  const matchedPlaces = useMemo(
    () =>
      places.filter((place) =>
        data?.some(
          (crawledData: CrawledData) => crawledData.name === place.place_name,
        ),
      ),
    [places, data],
  );

  const handleReservation = useCallback(
    (placeId: string) => {
      const kakaoPlace = matchedPlaces.find((p) => p.id === placeId);
      if (kakaoPlace) {
        const crawledPlace = data?.find(
          (item: CrawledData) => item.name === kakaoPlace.place_name,
        );
        if (crawledPlace) {
          navigate(`/detail/${crawledPlace.id}`);
        }
      }
    },
    [matchedPlaces, data, navigate],
  );

  if (!isLoaded) {
    return (
      <div
        className="w-full h-[50vh] flex items-center justify-center"
        role="status"
      >
        <div>카카오맵을 불러오는 중입니다...</div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-[90%] md:max-w-[65%] mx-[2.5%] min-h-[400px] h-[50vh] md:h-[60vh]"
    >
      <div className="relative w-full h-full">
        <div className="w-full h-full rounded-lg overflow-hidden shadow-lg border-2 border-[#fcb69f]">
          <Map
            center={center}
            style={{ width: '100%', height: '100%' }}
            level={zoomLevel}
            className="rounded-lg"
            onClick={() => setSelectedPlace(null)}
          >
            <AnimatePresence>
              {matchedPlaces.map((place) => (
                <MarkerOverlay
                  key={place.id}
                  place={place}
                  selectedPlace={selectedPlace}
                  onSelect={setSelectedPlace}
                  onReservation={handleReservation}
                />
              ))}
            </AnimatePresence>
          </Map>
        </div>

        <MapControls zoomIn={zoomIn} zoomOut={zoomOut} />

        <AnimatePresence>
          {places.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75"
              role="status"
            >
              <div className="text-lg text-gray-600">
                {keyword || category ? '검색 중...' : '장소를 검색해주세요'}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
});

KaKaoMap.displayName = 'KaKaoMap';

export default KaKaoMap;
