

const ReservationDetail = () => {

    const DetailContainer = 'w-[35vw] h-[50%] flex flex-col justify-around items-center'
    const ButtonStyle = "w-[4vw] h-[4vh] bg-[#e38994fb] text-white text-sm rounded-md hover:bg-[#fcb69f] transition duration-500 ease-in-out";

    const ButtonList = ["혼자", "2명", "3명", "4명", "5 ~ 6명" ]; 

    return (
        <div className={DetailContainer}>
                {/* 예약 시간 */}
                <h1 className="border-b-2 border-solid border-[#e38994fb]">예약 시간 (가게 브레이크 타임 반영)</h1>
                <div className="w-[20vw] flex justify-between my-[2%]">
                    <button>오전</button>
                    <button>점심</button>
                    <button>저녁</button>
                </div>

                {/* 예약 인원 */}
                <h1 className="border-b-2 border-solid border-[#e38994fb]">구성원</h1>
                <div className="w-[25vw] flex justify-around my-[2%]">
                {ButtonList.map((text, index) => (
                    <button className={ButtonStyle} key={index}>{text}</button>
                ))}
                </div>
        </div>
    )
}

export default ReservationDetail;