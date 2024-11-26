import ContentList from "./ContentList";
import Profile from "./profile/Profile";

const Content = () => {
    const ContentContainer =
      "w-[80%] h-[80%] flex flex-col justify-center items-center  bg-white rounded-xl shadow-xl border-2 border-solid border-[#EE6677]";
    
    return (
      <div className="w-full h-[92%] flex justify-center items-center">
        <div className={ContentContainer}>
          <Profile />
          <ContentList />
        </div>
      </div>
    );

}

export default Content;
