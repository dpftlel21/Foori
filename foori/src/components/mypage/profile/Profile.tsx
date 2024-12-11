import Logo from "../../common/Logo";
import OauthCon from './oauthCon/OauthCon';


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
        <div className="flex justify-between items-center">
          <OauthCon actionType='connect' />
        </div>
      </div>
    );
}

export default Profile;