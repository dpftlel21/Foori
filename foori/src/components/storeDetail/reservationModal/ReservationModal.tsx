import Calendar from "react-calendar";

interface ReservationModalProps {
    isOpen: boolean;
    onClose: () => void;
  }


const ReservationModal = ({isOpen, onClose}: ReservationModalProps) => {

    if (!isOpen) {
        return null;
      }

    const ReservationContainer =
    "w-[80%] h-[73.9%] flex flex-col justify-around mt-[2%] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  bg-white rounded-xl shadow-xl border-2 border-solid border-[#EE6677] z-50";
    const Content = "w-full h-[30%] flex justify-around items-center";
  const StoreInfo = "w-full flex justify-between items-center";
  const DivideDiv =
    "w-[45%] h-[100%] flex flex-col justify-around items-center";
    const ButtonStyle =
    "w-[23%] h-[6vh] ml-[12%] mb-[12%] bg-[#FF800B] text-white rounded-md hover:bg-[#fcb69f] transition duration-500 ease-in-out";


    return (

        <div className={ReservationContainer}>
            <div className={Content}>
          <div className={DivideDiv}>
            {/* 가게명, 평점 */}
            <div className={StoreInfo}>
              <h1 className="border-b-2 border-solid border-[#e38994fb]">
                가게명 : 진주에서 젤루다가 맛있는 맛집!
              </h1>
              <h1 className="mr-[15%]">평점 : 4.5 / 5.0</h1>
            </div>

            {/* 가게 주소, 오픈 시간, 브레이크 타임 */}
            <div className="w-full ">
              <h1>가게 주소 : 경상남도 진주시 석갑로 101-11</h1>
            </div>
          </div>

          {/* 예약 버튼 */}
          <div className={DivideDiv}>
          <button className={ButtonStyle} onClick={onClose}>닫기</button>
          </div>


        </div>

        <Calendar />

        
        </div>
    )

}

export default ReservationModal;