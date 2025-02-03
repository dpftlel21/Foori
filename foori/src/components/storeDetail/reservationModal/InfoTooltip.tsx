import { useState } from 'react';

const STYLES = {
  infoIcon: `
    w-8
    h-8
    flex
    items-center
    justify-center
    text-xl
    text-gray-600
    hover:text-gray-800
    cursor-help
    rounded-full
    hover:bg-gray-100
    transition-colors
  `,
  infoTooltip: `
    absolute
    top-full
    right-0
    bg-white
    p-6
    rounded-lg
    shadow-lg
    mt-2
    w-[320px]
    z-10
    border
    border-gray-200
    backdrop-blur-sm
    bg-white/95
  `,
  tooltipList: `
    space-y-4
    text-gray-700
    text-sm
    leading-relaxed
  `,
};

const InfoTooltip = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <button
        className={STYLES.infoIcon}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        ⓘ
      </button>
      {isVisible && (
        <div className={STYLES.infoTooltip}>
          <ul className={STYLES.tooltipList}>
            <li>• 장소 예약만 하실 경우 바로 예약하기를 누르시면 됩니다.</li>
            <li>• 메뉴도 같이 선택하여 선 결제 후 예약하실 수도 있습니다.</li>
            <li>• 메뉴 변경은 예약 시간 24시간 전까지 가능합니다.</li>
          </ul>
        </div>
      )}
    </>
  );
};

export default InfoTooltip;
