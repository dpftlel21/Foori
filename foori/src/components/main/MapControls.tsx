import { motion } from 'framer-motion';
import { memo } from 'react';
import { FiZoomIn, FiZoomOut } from 'react-icons/fi';

interface MapControlsProps {
  zoomIn: () => void;
  zoomOut: () => void;
}

const STYLES = {
  container: `
    absolute
    bottom-4
    right-4
    md:bottom-8
    md:right-8
    flex
    flex-col
    gap-2
    z-10
  `,
  button: `
    w-10
    h-10
    md:w-12
    md:h-12
    bg-white
    rounded-full
    shadow-lg
    flex
    items-center
    justify-center
    hover:shadow-xl
  `,
  icon: `
    w-5
    h-5
    md:w-6
    md:h-6
  `,
  locationIcon: `
    w-6
    h-6
    md:w-8
    md:h-8
  `,
} as const;

const MapControls = memo(({ zoomIn, zoomOut }: MapControlsProps) => {
  return (
    <div className={STYLES.container}>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={zoomIn}
        className={STYLES.button}
        aria-label="지도 확대"
      >
        <FiZoomIn className={STYLES.icon} />
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={zoomOut}
        className={STYLES.button}
        aria-label="지도 축소"
      >
        <FiZoomOut className={STYLES.icon} />
      </motion.button>
    </div>
  );
});

MapControls.displayName = 'MapControls';

export default MapControls;
