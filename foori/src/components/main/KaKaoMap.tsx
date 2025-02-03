import { AnimatePresence, motion } from 'framer-motion';
import { memo, useCallback, useMemo } from 'react';
import { FiZoomIn, FiZoomOut } from 'react-icons/fi';
import { Map } from 'react-kakao-maps-sdk';
import { useNavigate } from 'react-router-dom';
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

// 인터페이스 정의
interface KaKaoMapProps {
  keyword: string;
  category: string | null;
}

// 메모이제이션된 컨트롤 버튼 컴포넌트
const MapControls = memo(
  ({
    zoomIn,
    zoomOut,
    moveCurrent,
  }: {
    zoomIn: () => void;
    zoomOut: () => void;
    moveCurrent: () => void;
  }) => (
    <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 flex flex-col gap-2 z-10">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={zoomIn}
        className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-lg
                flex items-center justify-center hover:shadow-xl"
        aria-label="지도 확대"
      >
        <FiZoomIn className="w-5 h-5 md:w-6 md:h-6" />
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={zoomOut}
        className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-lg
                flex items-center justify-center hover:shadow-xl"
        aria-label="지도 축소"
      >
        <FiZoomOut className="w-5 h-5 md:w-6 md:h-6" />
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={moveCurrent}
        className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-lg
                flex items-center justify-center hover:shadow-xl"
        aria-label="현재 위치로 이동"
      >
        <img
          src="/assets/images/location.png"
          alt="현재 위치"
          className="w-6 h-6 md:w-8 md:h-8"
          loading="lazy"
        />
      </motion.button>
    </div>
  ),
);

MapControls.displayName = 'MapControls';

const KaKaoMap = memo(({ keyword, category }: KaKaoMapProps) => {
  const {
    places,
    selectedPlace,
    setSelectedPlace,
    center,
    moveCurrent,
    isLoaded,
    zoomLevel,
    zoomIn,
    zoomOut,
  } = useKakaoMap({ keyword, category });

  const { data } = useCrawledData();
  const navigate = useNavigate();

  // 매칭된 장소 메모이제이션
  const matchedPlaces = useMemo(
    () =>
      places.filter((place) =>
        data?.some(
          (crawledData: CrawledData) => crawledData.name === place.place_name,
        ),
      ),
    [places, data],
  );

  // 예약 핸들러 메모이제이션
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

  // 로딩 상태 처리
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
      className="w-full min-h-[400px] h-[50vh] md:h-[60vh] px-4 md:px-8 lg:px-16"
    >
      <div className="relative w-full h-full max-w-5xl mx-auto">
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

        <MapControls
          zoomIn={zoomIn}
          zoomOut={zoomOut}
          moveCurrent={moveCurrent}
        />

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
