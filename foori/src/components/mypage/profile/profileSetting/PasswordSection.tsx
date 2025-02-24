import { useState } from 'react';
import ActionButtons from './ActionButtons';

const PasswordSection = ({
  onSave,
  onLogout,
}: {
  onSave: () => void;
  onLogout: () => void;
}) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const STYLES = {
    section: 'p-[0.1rem] flex flex-col',
    title: 'text-xl font-bold mb-6',
    formGroup: 'space-y-5',
    inputGroup: 'space-y-2',
    label: 'text-sm text-gray-700 block',
    input: `
      w-full h-9 text-sm md:w-[500px] md:h-10 px-4 bg-[#FFF1F1] rounded-lg
      border border-[#FFD7D7]
      focus:outline-none focus:ring-2 focus:ring-[#D87373]
      placeholder:text-gray-400 text-gray-700
    `,
    // 버튼 스타일 수정
    buttonGroup: 'flex gap-2 mt-8', // 간격 조정
    button: `
      flex-1 h-12 rounded-lg font-medium
      bg-[#D87373] text-white
      hover:bg-[#fcb69f] transition-colors duration-200
      disabled:opacity-50 disabled:cursor-not-allowed
    `,
    secondaryButton: `
      flex-1 h-12 rounded-lg font-medium
      bg-gray-100 text-gray-600
      hover:bg-gray-200 transition-colors duration-200
    `,
  } as const;

  return (
    <section className={STYLES.section}>
      <h2 className={STYLES.title}>비밀번호 변경</h2>

      <div className={STYLES.formGroup}>
        <div className={STYLES.inputGroup}>
          <label className={STYLES.label}>현재 비밀번호</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="현재 비밀번호를 입력하세요"
            className={STYLES.input}
          />
        </div>

        <div className={STYLES.inputGroup}>
          <label className={STYLES.label}>새 비밀번호</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="새 비밀번호를 입력하세요"
            className={STYLES.input}
          />
        </div>

        <div className={STYLES.inputGroup}>
          <label className={STYLES.label}>새 비밀번호 확인</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="새 비밀번호를 다시 입력하세요"
            className={STYLES.input}
          />
        </div>
      </div>

      <div className="w-full flex justify-center items-center md:justify-start">
        <ActionButtons
          onSave={onSave}
          onLogout={onLogout}
          disabled={!currentPassword || !newPassword || !confirmPassword}
          saveText="비밀번호 변경"
          showLogout={true} // 비밀번호 섹션에서만 로그아웃 버튼 표시
        />
      </div>
    </section>
  );
};

export default PasswordSection;
