import Consumption from "./consumption/Consumption";
import Review from "./review/Review";
import ReservationStatus from "./reservation/ReservationStatus";
import { useState } from "react";
import EditProfile from "./profile/EditProfile";

const ContentList = () => {
  const ContentList =
    "w-[5vw] h-[3vh] flex justify-center text-center hover:bg-[#D87373] transition duration-500 ease-in-out";

  const [content, setContent] = useState<string>("profile");

  const Menu = [
    { id: "editProfile", text: "프로필 수정" },
    { id: "reservation", text: "예약 현황" },
    { id: "consumption", text: "소비 분석" },
    { id: "review", text: "내가 쓴 리뷰" },
  ];

  const List = {
    editProfile: <EditProfile />,
    reservation: <ReservationStatus />,
    consumption: <Consumption />,
    review: <Review />,
  };

  return (
    <div className="flex">
      <ul className="w-[7vw] h-[50vh] flex flex-col cursor-pointer shadow-lg border-r-2 border-solid border-[#EE6677]">
        {Menu.map((item) => (
          <li key={item.id} 
              className={ContentList}
              onClick={() => setContent(item.id)}>
            {item.text}
          </li>
        ))}
      </ul>
      <div className="flex-1">
        {List[content as keyof typeof List]}
      </div>
    </div>
  );
};

export default ContentList;
