import Logo from "../../common/Logo";

const Profile = () => {
    return (
      <div className="w-[80%] h-[10vh] flex justify-between items-center border-b-2 border-solid border-[#EE6677]">
        <div className="flex items-center">
          <Logo />
          <div className="flex flex-col ml-10">
            <h1>사용자 이름</h1>
            <h1>사용자 이메일</h1>
          </div>
        </div>
        <button className="w-[15%] h-[5vh]  bg-[#D87373] text-white rounded-md hover:bg-[#fcb69f] transition duration-500 ease-in-out">
          닉네임 변경
        </button>
      </div>
    );
}

export default Profile;