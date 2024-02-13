

const ReservationDetail = () => {

    const DetailContainer = 'w-full h-[50%] flex flex-col justify-around items-center'

    return (
        <div className={DetailContainer}>
            <div>
                {/* 예약 시간 */}
                <h1 className="border-b-2 border-solid border-[#e38994fb]">예약 시간 (가게 브레이크 타임 반영)</h1>
                <div className="w-full flex justify-between my-[2%]">
                    <button>오전</button>
                    <button>점심</button>
                    <button>저녁</button>
                </div>

                {/* 예약 인원 */}
                <h1 className="border-b-2 border-solid border-[#e38994fb]">구성원</h1>
                <div className="w-full flex justify-between my-[2%]">
                    <button>혼자</button>
                    <button>2명</button>
                    <button>3명</button>
                    <button>4명</button>
                    <button>5 ~ 6명</button>
                </div>
            </div>
        </div>
    )
}

export default ReservationDetail;