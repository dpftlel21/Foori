import { useState } from 'react';

interface MenuListProps {
  menus: {
    name: string;
    price: number;
  }[];
  selectedMenus: { [key: string]: number };
  onQuantityChange: (menuName: string, change: number) => void;
}

// 스타일
const STYLES = {
  menuButton: `
    w-full p-4 flex justify-between items-center bg-white rounded-xl 
    shadow-sm border border-gray-100 hover:border-[#e38994fb] transition-all duration-200
  `,
  modal: `
    fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50
  `,
  modalContent: `
    relative w-[90%] max-w-xl bg-white rounded-xl shadow-lg
    flex flex-col max-h-[60vh]
  `,
  modalHeader: `
    sticky top-0 flex justify-between items-center p-3 border-b border-gray-100 bg-white rounded-t-xl
  `,
  modalTitle: `
    text-lg font-bold text-gray-800
  `,
  closeButton: `
    p-1.5 hover:bg-gray-100 rounded-full transition-colors
  `,
  menuListContainer: `
    p-4 overflow-y-auto flex-1
  `,
  menuList: `
    grid grid-cols-1 gap-2
  `,
  menuItem: `
    w-full p-3 bg-white border border-gray-100 rounded-lg
    hover:border-[#e38994fb] transition-all duration-200
  `,
  menuInfo: `
    flex justify-between items-center mb-2
  `,
  menuName: `
    font-medium text-gray-800 text-[15px]
  `,
  menuPrice: `
    text-[#e38994fb] font-semibold text-[15px]
  `,
  quantityControl: `
    flex justify-end items-center gap-2
  `,
  quantityButton: `
    w-7 h-7 flex items-center justify-center rounded-full
    border border-[#e38994fb] text-[#e38994fb] 
    hover:bg-[#e38994fb] hover:text-white transition-all duration-200
  `,
  quantityText: `
    w-5 text-center font-medium text-gray-800
  `,
  modalFooter: `
    p-3 border-t border-gray-100 bg-white rounded-b-xl
  `,
  completeButton: `
    w-full py-2.5 bg-[#e38994fb] text-white rounded-lg
    hover:bg-[#d27883fb] transition-all duration-200 font-medium text-[15px]
  `,
};

const MenuList = ({
  menus,
  selectedMenus,
  onQuantityChange,
}: MenuListProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)} className={STYLES.menuButton}>
        <div className="flex items-center gap-2">
          <h2 className="font-medium text-gray-800">메뉴판</h2>
          <span className="text-sm text-gray-500">
            {Object.keys(selectedMenus).length > 0 &&
              `${Object.keys(selectedMenus).length}개 선택`}
          </span>
        </div>
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className={STYLES.modal}>
          <div className={STYLES.modalContent}>
            <div className={STYLES.modalHeader}>
              <h2 className={STYLES.modalTitle}>메뉴 선택</h2>
              <button
                onClick={() => setIsOpen(false)}
                className={STYLES.closeButton}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className={STYLES.menuListContainer}>
              <div className={STYLES.menuList}>
                {menus.map((menu) => (
                  <div key={menu.name} className={STYLES.menuItem}>
                    <div className={STYLES.menuInfo}>
                      <span className={STYLES.menuName}>{menu.name}</span>
                      <span className={STYLES.menuPrice}>
                        {menu.price.toLocaleString()}원
                      </span>
                    </div>
                    <div className={STYLES.quantityControl}>
                      <button
                        onClick={() => onQuantityChange(menu.name, -1)}
                        className={STYLES.quantityButton}
                      >
                        -
                      </button>
                      <span className={STYLES.quantityText}>
                        {selectedMenus[menu.name] || 0}
                      </span>
                      <button
                        onClick={() => onQuantityChange(menu.name, 1)}
                        className={STYLES.quantityButton}
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={STYLES.modalFooter}>
              <button
                onClick={() => setIsOpen(false)}
                className={STYLES.completeButton}
              >
                선택 완료
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MenuList;
