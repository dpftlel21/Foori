import { useEffect, useState } from 'react';
import { profileImageUpload } from '../../../../api/endpoints/profile';
import { useToast } from '../../../../contexts/ToastContext';
import ActionButtons from './ActionButtons';

const STYLES = {
  section:
    'md:flex md:flex-col md:items-start md:ml-4 rounded-lg p-[0.1rem] space-y-4',
  sectionTitle: 'text-lg font-bold text-gray-800 mb-2',
  imageSection: 'flex flex-col items-center space-y-3',
  imageUploadContainer: 'relative',
  imageInput: 'hidden',
  imageLabel: `
      flex items-center justify-center w-24 h-24
      border-2 border-dashed border-[#D87373] rounded-full
      cursor-pointer hover:bg-gray-50 transition-colors
      overflow-hidden
    `,
  uploadIcon: 'text-3xl text-[#D87373]',
  imageHelp: 'text-sm text-gray-500 text-center',
  imageHelpSub: 'text-xs text-gray-400',
  previewImage: 'w-full h-full object-cover',
} as const;

const ImageSection = ({ onLogout }: { onLogout: () => void }) => {
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { showToast } = useToast();

  // 이미지 변경
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      // 이미지 미리보기 URL 생성
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (profileImage) {
      try {
        await profileImageUpload(profileImage);
        showToast('프로필이 성공적으로 저장되었습니다.', 'success');
      } catch (error) {
        showToast('프로필 저장 중 오류가 발생했습니다.', 'error');
      }
    }
  };

  // 컴포넌트가 언마운트될 때 미리보기 URL 정리
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <form onSubmit={handleSubmit} className={STYLES.section}>
      <h2 className={STYLES.sectionTitle}>프로필 이미지</h2>
      <div className={STYLES.imageSection}>
        <div className={STYLES.imageUploadContainer}>
          <input
            type="file"
            id="profileImage"
            className={STYLES.imageInput}
            onChange={handleImageChange}
            accept="image/*"
          />
          <label htmlFor="profileImage" className={STYLES.imageLabel}>
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="프로필 미리보기"
                className={STYLES.previewImage}
              />
            ) : (
              <span className={STYLES.uploadIcon}>📸</span>
            )}
          </label>
        </div>
        <p className={STYLES.imageHelp}>
          프로필 이미지를 변경하려면 클릭하세요
        </p>
        <p className={STYLES.imageHelpSub}>최대 5MB, JPG, PNG 파일만 가능</p>
      </div>
      <div className="w-full flex justify-center items-center md:justify-start">
        <ActionButtons
          profileImage={profileImage}
          onSave={() => {}}
          onLogout={onLogout}
          disabled={!profileImage}
          saveText="이미지 저장"
          showLogout={false}
        />
      </div>
    </form>
  );
};

export default ImageSection;
