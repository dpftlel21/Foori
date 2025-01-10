import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cookieStorage } from '../../../../api/cookies';
import { useToast } from '../../../../contexts/ToastContext';
import ImageSection from './ImageSection';
import PasswordSection from './PasswordSection';

const ProfileSettings = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'profile' | 'password'>('profile');

  const STYLES = {
    // 전체 컨테이너 - 화면 높이에서 헤더와 하단 네비게이션 높이를 뺀 값
    container: 'w-full flex flex-col bg-white',
    // 탭 컨테이너
    tabContainer: 'md:hidden flex border-b bg-white',
    tab: 'flex-1 py-3 text-center text-sm font-medium transition-colors',
    tabActive: 'text-[#D87373] border-b-2 border-[#D87373]',
    tabInactive: 'text-gray-500',
    // 스크롤 가능한 컨텐츠 영역
    content: 'flex-1 overflow-y-auto',
    // 하단 버튼 영역
    buttonContainer: 'p-4 border-t bg-white',
    buttonGroup: 'flex gap-2',
    button: 'flex-1 h-11 rounded-lg font-medium text-sm transition-colors',
    primaryButton: 'bg-[#D87373] text-white hover:bg-[#fcb69f]',
    secondaryButton: 'bg-gray-100 text-gray-600 hover:bg-gray-200',
  } as const;

  const logout = () => {
    cookieStorage.removeToken();
    navigate('/login');
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      showToast('로그아웃 중 오류가 발생했습니다.');
    }
  };

  const handleSave = async () => {
    showToast('프로필이 성공적으로 저장되었습니다.');
  };

  return (
    <div className={STYLES.container}>
      {/* 모바일 탭 */}
      <div className={STYLES.tabContainer}>
        <button
          className={`${STYLES.tab} ${
            activeTab === 'profile' ? STYLES.tabActive : STYLES.tabInactive
          }`}
          onClick={() => setActiveTab('profile')}
        >
          프로필 이미지
        </button>
        <button
          className={`${STYLES.tab} ${
            activeTab === 'password' ? STYLES.tabActive : STYLES.tabInactive
          }`}
          onClick={() => setActiveTab('password')}
        >
          비밀번호 변경
        </button>
      </div>

      {/* 데스크톱: 모든 섹션 표시 */}
      <div className="hidden md:block space-y-8">
        <ImageSection onSave={handleSave} onLogout={handleLogout} />
        <PasswordSection onSave={handleSave} onLogout={handleLogout} />
      </div>

      {/* 모바일: 활성 탭에 따라 섹션 표시 */}
      <div className="md:hidden">
        {activeTab === 'profile' ? (
          <ImageSection onSave={handleSave} onLogout={handleLogout} />
        ) : (
          <PasswordSection onSave={handleSave} onLogout={handleLogout} />
        )}
      </div>
    </div>
  );
};

export default ProfileSettings;
