import { useState } from 'react';
import ActionButtons from './ActionButtons';

const ImageSection = ({
  onSave,
  onLogout,
}: {
  onSave: () => void;
  onLogout: () => void;
}) => {
  const [profileImage, setProfileImage] = useState<File | null>(null);

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
    `,
    uploadIcon: 'text-3xl text-[#D87373]',
    imageHelp: 'text-sm text-gray-500 text-center',
    imageHelpSub: 'text-xs text-gray-400',
  } as const;

  return (
    <section className={STYLES.section}>
      <h2 className={STYLES.sectionTitle}>프로필 이미지</h2>
      <div className={STYLES.imageSection}>
        <div className={STYLES.imageUploadContainer}>
          <input
            type="file"
            id="profileImage"
            className={STYLES.imageInput}
            onChange={(e) => setProfileImage(e.target.files?.[0] || null)}
            accept="image/*"
          />
          <label htmlFor="profileImage" className={STYLES.imageLabel}>
            <span className={STYLES.uploadIcon}>📸</span>
          </label>
        </div>
        <p className={STYLES.imageHelp}>
          프로필 이미지를 변경하려면 클릭하세요
        </p>
        <p className={STYLES.imageHelpSub}>최대 5MB, JPG, PNG 파일만 가능</p>
      </div>
      <div className="w-full flex justify-center items-center md:justify-start">
        <ActionButtons
          onSave={onSave}
          onLogout={onLogout}
          disabled={!profileImage}
          saveText="이미지 저장"
          showLogout={false} // 이미지 섹션에서는 저장 버튼만 표시
        />
      </div>
    </section>
  );
};

export default ImageSection;
