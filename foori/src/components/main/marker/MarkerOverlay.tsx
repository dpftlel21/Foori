import { AnimatePresence, motion } from 'framer-motion';
import { CustomOverlayMap } from 'react-kakao-maps-sdk';
import './Marker.css';

interface Place {
  id: string;
  place_name: string;
  address_name: string;
  category_name: string;
  x: string;
  y: string;
}

interface MarkerOverlayProps {
  place: Place;
  selectedPlace: string | null;
  onSelect: (id: string) => void;
  onReservation: (id: string) => void;
}

// 카테고리 아이콘
const categoryIcons = {
  한식: { icon: '🍖', color: '#F24A4A' },
  일식: { icon: '🍣', color: '#262CC2' },
  중식: { icon: '🍜', color: '#36A51A' },
  양식: { icon: '🍝', color: '#1A84A5' },
  카페: { icon: '☕', color: '#F874A7' },
  분식: { icon: '🍲', color: '#ce2f2f' },
  패스트푸드: { icon: '🍔', color: '#b47cdf' },
  치킨: { icon: '🍗', color: '#ff800b' },
  술집: { icon: '🍺', color: '#2cad48' },
} as const;

// 카테고리 타입 반환
const getCategoryType = (category_name: string): keyof typeof categoryIcons => {
  if (category_name.includes('한식')) return '한식';
  if (category_name.includes('일식')) return '일식';
  if (category_name.includes('중식')) return '중식';
  if (category_name.includes('양식')) return '양식';
  if (category_name.includes('카페')) return '카페';
  if (category_name.includes('분식')) return '분식';
  if (category_name.includes('패스트푸드')) return '패스트푸드';
  if (category_name.includes('치킨')) return '치킨';
  if (category_name.includes('술집')) return '술집';
  return '한식'; // 기본값
};

// 오버레이 애니메이션
const overlayVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: 10,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 25,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    y: 10,
    transition: {
      duration: 0.2,
    },
  },
};

const MarkerOverlay = ({
  place,
  selectedPlace,
  onSelect,
  onReservation,
}: MarkerOverlayProps) => {
  const category = getCategoryType(place.category_name);
  const { icon, color } = categoryIcons[category];

  return (
    <>
      <CustomOverlayMap
        position={{
          lat: parseFloat(place.y),
          lng: parseFloat(place.x),
        }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          onClick={() => onSelect(place.id)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '40px',
            height: '40px',
            background: color,
            borderRadius: '50%',
            border: '2px solid white',
            boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
            cursor: 'pointer',
            fontSize: '20px',
            color: 'white',
            padding: '8px',
          }}
        >
          {icon}
        </motion.div>
      </CustomOverlayMap>

      <AnimatePresence>
        {selectedPlace === place.id && (
          <CustomOverlayMap
            position={{
              lat: parseFloat(place.y),
              lng: parseFloat(place.x),
            }}
            zIndex={1}
          >
            <motion.div
              className="overlay-content"
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{
                transform: 'translate(-50%, -130%)',
                marginTop: '-20px',
              }}
            >
              <motion.button
                className="close-btn"
                onClick={() => onSelect(null as unknown as string)}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                ✕
              </motion.button>
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h3>{place.place_name}</h3>
                <p>{place.address_name}</p>
                <div
                  className="category-tag"
                  style={{ backgroundColor: color }}
                ></div>
              </motion.div>
              <motion.button
                className="reservation-btn"
                onClick={() => onReservation(place.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                예약하기
              </motion.button>
            </motion.div>
          </CustomOverlayMap>
        )}
      </AnimatePresence>
    </>
  );
};

export default MarkerOverlay;
