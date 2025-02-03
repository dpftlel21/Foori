import { AnimatePresence, motion } from 'framer-motion';
import { memo, useCallback } from 'react';
import { CustomOverlayMap } from 'react-kakao-maps-sdk';
import { categoryIcons, getCategoryType } from '../../../styles/categoryIcons';
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
  onSelect: (id: string | null) => void;
  onReservation: (id: string) => void;
}

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
    transition: { duration: 0.2 },
  },
};

const MarkerOverlay = memo(
  ({ place, selectedPlace, onSelect, onReservation }: MarkerOverlayProps) => {
    const category = getCategoryType(place.category_name);
    const { icon, color } = categoryIcons[category];

    const handleMarkerClick = useCallback(() => {
      onSelect(place.id);
    }, [place.id, onSelect]);

    const handleClose = useCallback(() => {
      onSelect(null);
    }, [onSelect]);

    const handleReservation = useCallback(() => {
      onReservation(place.id);
    }, [place.id, onReservation]);

    return (
      <>
        <CustomOverlayMap
          position={{
            lat: parseFloat(place.y),
            lng: parseFloat(place.x),
          }}
        >
          <motion.div
            className="marker-wrapper"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            onClick={handleMarkerClick}
            role="button"
            aria-label={`${place.place_name} 마커`}
            style={{
              background: color,
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid white',
              boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
              fontSize: '20px',
              color: 'white',
              willChange: 'transform',
            }}
          >
            <span role="img" aria-label={category}>
              {icon}
            </span>
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
                role="dialog"
                aria-label={`${place.place_name} 정보`}
              >
                <motion.button
                  className="close-btn"
                  onClick={handleClose}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="닫기"
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
                </motion.div>
                <motion.button
                  className="reservation-btn"
                  onClick={handleReservation}
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
  },
);

MarkerOverlay.displayName = 'MarkerOverlay';

export default MarkerOverlay;
