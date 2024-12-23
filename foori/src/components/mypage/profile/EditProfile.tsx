import { useState } from 'react';
import { passwordCheck } from '../../../api/profile';
import Lock from '../../../assets/images/lock.png';
import MenuContainer from '../../common/MenuContainer';
import ProfileSettings from './ProfileSettings';
const EditProfile = () => {
  const [password, setPassword] = useState<string>('');
  const [isVerified, setIsVerified] = useState<boolean>(false);

  // 비밀번호 확인
  const handleVerify = async () => {
    if (password) {
      const response = await passwordCheck(password);

      if (response.ok) {
        setIsVerified(true);
      }
    }
  };

  if (isVerified) {
    return <ProfileSettings />;
  }

  return (
    <MenuContainer>
      <div className="flex justify-center items-center">
        <div className="w-[19vw] flex items-center">
          <img src={Lock} alt="lock" className="w-10" />
          <h1>현재 비밀번호</h1>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="현재 비밀번호를 입력하세요."
          className="w-[15vw] h-[3.5vh] p-2 bg-[#F4D1D1] rounded-md"
        />
        <button
          onClick={handleVerify}
          className="w-[4vw] h-[3.5vh] ml-2 bg-[#D87373] text-white rounded-md hover:bg-[#fcb69f] transition duration-500 ease-in-out"
        >
          확인
        </button>
      </div>
    </MenuContainer>
  );
};

export default EditProfile;
