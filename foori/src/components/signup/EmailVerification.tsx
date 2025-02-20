import { useState } from 'react';
import Email from '../../assets/images/email.png';
import { useToast } from '../../contexts/ToastContext';
import { useRegister } from '../../hooks/auth/useAuth';
import { COMMON_INPUT_STYLES } from '../../styles/commonStyles';

interface EmailVerificationProps {
  email: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onVerificationComplete: () => void;
  error?: string;
}

const EmailVerification = ({
  email,
  onChange,
  onVerificationComplete,
  error,
}: EmailVerificationProps) => {
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const { verifyEmailMutation, verifyCodeMutation } = useRegister();
  const { showToast } = useToast();

  const handleVerifyClick = async () => {
    try {
      if (!email) {
        showToast('이메일을 입력해주세요.', 'error');
        return;
      }
      await verifyEmailMutation.mutate(email);
      showToast('인증 메일이 발송되었습니다.', 'success');
      setShowCodeInput(true);
    } catch (error) {
      showToast('인증 메일 발송에 실패했습니다.', 'error');
    }
  };

  const handleVerifyCode = async () => {
    try {
      if (!verificationCode) {
        showToast('인증 코드를 입력해주세요.', 'error');
        return;
      }
      await verifyCodeMutation.mutate({
        code: verificationCode,
        email: email,
      });
      showToast('이메일 인증이 완료되었습니다.', 'success');
      onVerificationComplete();
    } catch (error) {
      showToast('인증 코드가 올바르지 않습니다.', 'error');
    }
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
            onClick={handleVerifyCode}
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
