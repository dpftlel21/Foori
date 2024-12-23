import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cookieStorage } from '../../../api/cookies';
import {
  passwordChange,
  profileImageDelete,
  profileImageUpload,
} from '../../../api/profile';
import { useToast } from '../../../contexts/ToastContext';
import MenuContainer from '../../common/MenuContainer';

const ProfileSettings = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profileImage, setProfileImage] = useState<File | null>(null);

  const logout = () => {
    cookieStorage.removeToken();
    navigate('/login');
  };

  const STYLES = {
    container: 'space-y-8 w-full max-w-2xl mx-auto p-4',
    section: 'flex flex-col space-y-4',
    title: 'text-xl font-bold text-gray-800',

    // 입력 필드 관련
    inputContainer: 'flex flex-col space-y-3',
    input:
      'w-full sm:max-w-[300px] h-[40px] p-2 bg-[#F4D1D1] rounded-md focus:outline-none focus:ring-2 focus:ring-[#D87373]',

    // 버튼 관련
    button:
      'w-full sm:w-[120px] h-[40px] bg-[#D87373] text-white rounded-md hover:bg-[#fcb69f] transition-colors duration-200',

    // 이미지 업로드 관련
    imageUploadContainer: 'relative',
    imageInput: 'hidden',
    imageLabel:
      'flex items-center justify-center w-[120px] h-[120px] border-2 border-dashed border-[#D87373] rounded-md cursor-pointer hover:bg-gray-50 transition-colors duration-200',
    uploadIcon: 'text-4xl text-[#D87373]',
  };

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      showToast('새 비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      // 비밀번호 변경 API 호출
      await passwordChange(currentPassword, newPassword);

      showToast('비밀번호가 성공적으로 변경되었습니다.');
      // 토큰 초기화
      logout();
    } catch (error) {
      showToast('비밀번호 변경에 실패했습니다.');
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setProfileImage(e.target.files[0]);
      // 이미지 업로드 API 호출
      profileImageUpload(e.target.files[0]);
    }
  };

  const handleImageDelete = () => {
    // 이미지 삭제 API 호출
    profileImageDelete();
  };

  return (
    <MenuContainer>
      <div className={STYLES.container}>
        <div className={STYLES.section}>
          <h2 className={STYLES.title}>비밀번호 변경</h2>
          <div className={STYLES.inputContainer}>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="현재 비밀번호"
              className={STYLES.input}
            />
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="새 비밀번호"
              className={STYLES.input}
            />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="새 비밀번호 확인"
              className={STYLES.input}
            />
          </div>
          <button onClick={handlePasswordChange} className={STYLES.button}>
            비밀번호 변경
          </button>
        </div>

        <div className={STYLES.section}>
          <h2 className={STYLES.title}>프로필 이미지</h2>
          <div className={STYLES.imageUploadContainer}>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className={STYLES.imageInput}
              id="imageUpload"
            />
            <label htmlFor="imageUpload" className={STYLES.imageLabel}>
              <span className={STYLES.uploadIcon}>+</span>
            </label>
          </div>
          <button onClick={handleImageDelete} className={STYLES.button}>
            이미지 삭제
          </button>
        </div>
      </div>
    </MenuContainer>
  );
};

export default ProfileSettings;
