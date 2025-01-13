import MenuList from './MenuList';

// 메뉴 정보 타입 정의
interface Menu {
  id: number;
  name: string;
  price: number;
}

// Props 인터페이스 - 부모로부터 받는 상태와 상태 변경 함수들
interface ReservationMenuProps {
  menus: Menu[];
  selectedMenus: { [menuId: number]: number };
  setSelectedMenus: React.Dispatch<
    React.SetStateAction<{ [menuId: number]: number }>
  >;
  setTotalAmount: React.Dispatch<React.SetStateAction<number>>;
  handleBooking: (amount: number) => void;
}

const ReservationMenu = ({
  menus,
  selectedMenus,
  setSelectedMenus,
  setTotalAmount,
  handleBooking,
}: ReservationMenuProps) => {
  // 스타일 정의
  const STYLES = {
    container: 'w-full h-full flex flex-col md:flex-row bg-gray-50',
    leftSection: 'w-full md:w-2/3 h-full flex flex-col p-4 space-y-4',
    paymentSection:
      'p-3 bg-white rounded-lg shadow-md border border-[#e38994fb]',
    totalAmount: 'font-bold text-lg text-gray-800',
    totalAmountValue: 'ml-2 text-[#e38994fb]',
    button:
      'bg-[#e38994fb] text-white px-6 py-2 rounded-lg hover:bg-[#d27883fb] transition-all duration-200 font-medium shadow-sm hover:shadow-md',
    fullWidthButton:
      'w-full bg-[#e38994fb] text-white px-6 py-2 rounded-lg hover:bg-[#d27883fb] transition-all duration-200 font-medium shadow-sm hover:shadow-md',
    rightSection: 'w-full md:w-1/3 h-full bg-white border-l border-gray-100',
    infoContainer: 'p-4',
    infoTitle: 'text-lg font-bold text-gray-800 mb-3',
    infoList: 'space-y-4',
    infoBullet: 'flex items-start gap-2',
    bulletPoint: 'text-[#e38994fb]',
    infoText: 'text-gray-600 text-sm',
  } as const;

  // 메뉴 수량 변경 핸들러
  const handleQuantityChange = (menuId: number, change: number) => {
    setSelectedMenus((prev) => {
      const newQuantity = (prev[menuId] || 0) + change;
      if (newQuantity <= 0) {
        // menuId에 해당하는 항목만 제거
        const { [menuId]: removed, ...rest } = prev;
        return rest;
      }
      // menuId에 해당하는 수량만 업데이트
      return { ...prev, [menuId]: newQuantity };
    });
  };

  // 총 금액 계산 함수
  const calculateTotal = () => {
    return Object.entries(selectedMenus || {}).reduce(
      (total, [menuId, quantity]) => {
        const menu = menus.find((m) => m.id === Number(menuId));
        return total + (menu?.price || 0) * quantity;
      },
      0,
    );
  };

  const handlePayment = async () => {
    const totalAmount = calculateTotal();
    if (totalAmount > 0) {
      await handleBooking(totalAmount);
    } else {
      alert('메뉴를 선택해주세요.');
    }
  };

  return (
    <div className={STYLES.container}>
      {/* 왼쪽 섹션 - 메뉴 목록 */}
      <div className={STYLES.leftSection}>
        <MenuList
          menus={menus}
          selectedMenus={selectedMenus}
          onQuantityChange={handleQuantityChange} // 수량 변경 함수
        />

        {/* 결제/예약 섹션 */}
        <div className={STYLES.paymentSection}>
          <div className="flex justify-between items-center">
            {Object.keys(selectedMenus).length > 0 ? (
              <>
                <p className={STYLES.totalAmount}>
                  총 금액:
                  <span className={STYLES.totalAmountValue}>
                    {calculateTotal().toLocaleString()}원
                  </span>
                </p>
                <button onClick={handlePayment} className={STYLES.button}>
                  결제하기
                </button>
              </>
            ) : (
              <button className={STYLES.fullWidthButton}>예약하기</button>
            )}
          </div>
        </div>
      </div>

      {/* 오른쪽 섹션 - 안내사항 */}
      <div className={STYLES.rightSection}>
        <div className={STYLES.infoContainer}>
          <h2 className={STYLES.infoTitle}>안내사항</h2>
          <div className={STYLES.infoList}>
            <div className={STYLES.infoBullet}>
              <span className={STYLES.bulletPoint}>•</span>
              <p className={STYLES.infoText}>
                장소 예약만 하실 경우 바로 예약하기를 누르시면 됩니다.
              </p>
            </div>
            <div className={STYLES.infoBullet}>
              <span className={STYLES.bulletPoint}>•</span>
              <p className={STYLES.infoText}>
                메뉴도 같이 선택하여 선 결제 후 예약하실 수도 있습니다.
              </p>
            </div>
            <div className={STYLES.infoBullet}>
              <span className={STYLES.bulletPoint}>•</span>
              <p className={STYLES.infoText}>
                메뉴 변경은 예약 시간 24시간 전까지 가능합니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationMenu;
