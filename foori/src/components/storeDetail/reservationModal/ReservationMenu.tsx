


const ReservationMenu = () => {

    const MenuContainer = 'w-full h-[30%] flex justify-around items-center'
    // 리뷰 스타일링
    const Review =
    "w-full h-[100%] grid grid-cols-2 gap-2 overflow-scroll overflow-x-hidden";
    const ReviewLi =
    "w-full h-[5vh] flex justify-around items-center my-[1%] bg-[#F0CCCC] ";


    return (
        <div className={MenuContainer}>
            <div className="w-[30vw] h-[20vh] flex flex-col items-center">
                <h1 className="w-full flex justify-start border-b-2 border-solid border-[#e38994fb]">메뉴 선택</h1>
                <ul className={Review}>
                    <li className={ReviewLi}></li>
                    <li className={ReviewLi}></li>
                    <li className={ReviewLi}></li>
                    <li className={ReviewLi}></li>
                </ul>
            </div>

            <div>
                <h1>* 장소 예약만 하실 경우 바로 예약하기를 누르시면 됩니다.</h1>
                <h1>* 메뉴도 같이 선택하여 선 결제 후 예약하실 수도 있습니다.</h1>
            </div>
        </div>
    )
}

export default ReservationMenu;