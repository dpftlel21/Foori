import { useState } from 'react';
import Email from '../../assets/images/email.png';
import { COMMON_INPUT_STYLES } from '../../styles/commonStyles';

interface EmailVerificationProps {
  email: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onVerify: () => void;
  onCodeSubmit: (code: string) => void;
  error?: string;
}

const EmailVerification = ({
  email,
  onChange,
  onVerify,
  onCodeSubmit,
  error,
}: EmailVerificationProps) => {
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');

  const handleVerifyClick = () => {
    onVerify();
    setShowCodeInput(true);
  };

  const handleCodeSubmit = () => {
    onCodeSubmit(verificationCode);
  };

  return (
    <div className={COMMON_INPUT_STYLES.container}>
      <div className={COMMON_INPUT_STYLES.labelContainer}>
        <img src={Email} alt="" className={COMMON_INPUT_STYLES.labelIcon} />
        <label className={COMMON_INPUT_STYLES.label}>이메일</label>
      </div>

      <div className={COMMON_INPUT_STYLES.inputContainer}>
        <input
          className={COMMON_INPUT_STYLES.input(error)}
          type="email"
          name="email"
          value={email}
          placeholder="이메일을 입력하세요."
          onChange={onChange}
        />
        <button
          type="button"
          className={COMMON_INPUT_STYLES.button}
          onClick={handleVerifyClick}
          disabled={!email}
        >
          인증하기
        </button>
      </div>

      {showCodeInput && (
        <div className={COMMON_INPUT_STYLES.verificationContainer}>
          <input
            className={COMMON_INPUT_STYLES.input()}
            type="text"
            placeholder="인증번호를 입력하세요"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          />
          <button
            type="button"
            className={COMMON_INPUT_STYLES.button}
            onClick={handleCodeSubmit}
          >
            확인
          </button>
        </div>
      )}

      {error && <p className={COMMON_INPUT_STYLES.errorText}>{error}</p>}
    </div>
  );
};

export default EmailVerification;
