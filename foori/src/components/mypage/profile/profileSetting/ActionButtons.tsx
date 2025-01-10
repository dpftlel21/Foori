interface ActionButtonsProps {
  onSave: () => void;
  onLogout: () => void;
  disabled?: boolean;
  saveText?: string;
  showLogout?: boolean; // 로그아웃 버튼 표시 여부
}

const ActionButtons = ({
  onSave,
  onLogout,
  disabled = false,
  saveText = '변경사항 저장',
  showLogout = false, // 기본값은 false
}: ActionButtonsProps) => {
  const STYLES = {
    buttonGroup: 'flex gap-2 mt-4',
    button: `
      flex-1 w-40 h-11 md:w-40 md:h-6 rounded-lg font-medium text-sm
      transition-colors duration-200
    `,
    primaryButton: `
      bg-[#D87373] text-white
      hover:bg-[#fcb69f]
      disabled:opacity-50 disabled:cursor-not-allowed
    `,
    secondaryButton: 'bg-gray-100 text-gray-600 hover:bg-gray-200',
  } as const;

  return (
    <div className={STYLES.buttonGroup}>
      <button
        onClick={onSave}
        disabled={disabled}
        className={`${STYLES.button} ${STYLES.primaryButton}`}
      >
        {saveText}
      </button>
      {showLogout && (
        <button
          onClick={onLogout}
          className={`${STYLES.button} ${STYLES.secondaryButton}`}
        >
          로그아웃
        </button>
      )}
    </div>
  );
};

export default ActionButtons;
