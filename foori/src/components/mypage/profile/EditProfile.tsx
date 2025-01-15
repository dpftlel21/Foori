import { useState } from 'react';
import { passwordCheck } from '../../../api/endpoints/profile';
import Lock from '../../../assets/images/lock.png';
import MenuContainer from '../../common/MenuContainer';
import ProfileSettings from './profileSetting/ProfileSettings';

const EditProfile = () => {
  const [password, setPassword] = useState<string>('');
  const [isVerified, setIsVerified] = useState<boolean>(false);

  const STYLES = {
    wrapper: 'flex flex-col justify-center items-center space-y-4 p-4 md:p-6',
    titleContainer: 'flex items-center space-x-3',
    lockIcon: 'w-8 h-8',
    title: 'text-lg font-medium',
    inputGroup: 'flex flex-col sm:flex-row items-center w-full max-w-md gap-2',
    input: 'w-full sm:flex-1 px-4 py-2 bg-[#F4D1D1] rounded-md',
    button:
      'w-full sm:w-24 px-4 py-2 bg-[#D87373] text-white rounded-md hover:bg-[#fcb69f] transition-colors duration-200',
  } as const;

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
      <div className={STYLES.wrapper}>
        <div className={STYLES.titleContainer}>
          <img src={Lock} alt="lock" className={STYLES.lockIcon} />
          <h1 className={STYLES.title}>현재 비밀번호</h1>
        </div>
        <div className={STYLES.inputGroup}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="현재 비밀번호를 입력하세요."
            className={STYLES.input}
          />
          <button onClick={handleVerify} className={STYLES.button}>
            확인
          </button>
        </div>
      </div>
    </MenuContainer>
  );
};

export default EditProfile;
