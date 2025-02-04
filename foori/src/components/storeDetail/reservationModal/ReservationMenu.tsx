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

// 스타일 정의
const STYLES = {
  container: 'w-full flex flex-col md:flex-row bg-gray-50',
  leftSection: 'w-full h-full flex flex-col p-4 space-y-4',
  paymentSection: 'p-3 bg-white rounded-lg shadow-md border border-[#e38994fb]',
  totalAmount: 'font-bold text-lg text-gray-800',
  totalAmountValue: 'ml-2 text-[#e38994fb]',
  button:
    'bg-[#e38994fb] text-white px-6 py-2 rounded-lg hover:bg-[#d27883fb] transition-all duration-200 font-medium shadow-sm hover:shadow-md',
  fullWidthButton:
    'w-full bg-[#e38994fb] text-white px-6 py-2 rounded-lg hover:bg-[#d27883fb] transition-all duration-200 font-medium shadow-sm hover:shadow-md',
} as const;

const ReservationMenu = ({
  menus,
  selectedMenus,
  setSelectedMenus,
  handleBooking,
}: ReservationMenuProps) => {
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
          onQuantityChange={handleQuantityChange}
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
    </div>
  );
};

export default ReservationMenu;
