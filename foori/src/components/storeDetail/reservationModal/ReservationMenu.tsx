import React, { useState } from 'react';

interface ReservationMenuProps {
  menus: {
    name: string;
    price: number;
  }[];
}

const ReservationMenu = ({ menus }: ReservationMenuProps) => {
  const [selectedMenus, setSelectedMenus] = useState<{ [key: string]: number }>(
    {},
  );

  const MenuContainer = 'w-full h-[30%] flex justify-around items-center';
  const Review =
    'w-full h-[100%] grid grid-cols-2 gap-2 overflow-scroll overflow-x-hidden';
  const ReviewLi =
    'w-full h-[5vh] flex justify-between items-center my-[1%] bg-[#F0CCCC] px-4';

  const calculateTotal = () => {
    return Object.entries(selectedMenus).reduce(
      (total, [menuName, quantity]) => {
        const menu = menus.find((m) => m.name === menuName);
        return total + (menu?.price || 0) * quantity;
      },
      0,
    );
  };

  const handleQuantityChange = (menuName: string, change: number) => {
    setSelectedMenus((prev) => {
      const newQuantity = (prev[menuName] || 0) + change;
      if (newQuantity <= 0) {
        const { [menuName]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [menuName]: newQuantity };
    });
  };

  const handlePayment = () => {
    // 결제 로직 구현
    console.log('선택된 메뉴:', selectedMenus);
    console.log('총 금액:', calculateTotal());
  };

  return (
    <div className={MenuContainer}>
      <div className="w-full h-[20vh] flex flex-col justify-center items-center">
        <h1 className="w-full flex justify-start mb-4">
          메뉴 선택
        </h1>
        <ul className={Review}>
          {menus.map((menu, index) => (
            <li className={ReviewLi} key={index}>
              <div>
                <span className="font-medium">{menu.name}</span>
                <span className="ml-2 text-gray-600">
                  {menu.price.toLocaleString()}원
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleQuantityChange(menu.name, -1)}
                  className="px-2 py-1 bg-white rounded hover:bg-gray-300"
                >
                  -
                </button>
                <span className="w-8 text-center">
                  {selectedMenus[menu.name] || 0}
                </span>
                <button
                  onClick={() => handleQuantityChange(menu.name, 1)}
                  className="px-2 py-1 bg-white rounded hover:bg-gray-300"
                >
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="w-full mt-4 flex flex-col items-end gap-2">
          <p className="font-bold text-lg">
            총 금액: {calculateTotal().toLocaleString()}원
          </p>
          {calculateTotal() > 0 && (
            <button
              onClick={handlePayment}
              className="bg-[#e38994fb] text-white px-4 py-2 rounded hover:bg-[#d27883fb]"
            >
              결제하기
            </button>
          )}
        </div>
      </div>

      <div className="text-gray-600">
        <h1 className="mb-2">
          * 장소 예약만 하실 경우 바로 예약하기를 누르시면 됩니다.
        </h1>
        <h1>* 메뉴도 같이 선택하여 선 결제 후 예약하실 수도 있습니다.</h1>
      </div>
    </div>
  );
};

export default ReservationMenu;
