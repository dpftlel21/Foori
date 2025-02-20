import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from '../../assets/images/calendar.png';
import Lock from '../../assets/images/lock.png';
import Person from '../../assets/images/person.png';
import { useToast } from '../../contexts/ToastContext';
import { useRegister } from '../../hooks/auth/useAuth';
import { useFormValidation } from '../../hooks/form/useFormValidation';
import { COMMON_INPUT_STYLES } from '../../styles/commonStyles';
import Logo from '../common/Logo';
import EmailVerification from './EmailVerification';

const SignUpBox = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [showVerificationInput, setShowVerificationInput] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const { registerMutation, verifyEmailMutation, verifyCodeMutation } =
    useRegister();

  const { formData, handleChange, errors, validateForm } = useFormValidation(
    {
      email: '',
      password: '',
      confirmPassword: '',
      nickname: '',
      birth: '',
      phone: '',
    },
    'signup',
  );

  const handleCertify = async () => {
    try {
      if (!formData.email) {
        showToast('이메일을 입력해주세요.', 'error');
        return;
      }
      await verifyEmailMutation.mutate(formData.email);
      showToast('인증 메일이 발송되었습니다.', 'success');
      setShowVerificationInput(true);
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
      await verifyCodeMutation.mutate(verificationCode);
      setIsEmailVerified(true);
      showToast('이메일 인증이 완료되었습니다.', 'success');
    } catch (error) {
      showToast('인증 코드가 올바르지 않습니다.', 'error');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEmailVerified) {
      showToast('이메일 인증이 필요합니다.', 'warning');
      return;
    }

    try {
      if (!validateForm()) return;
      await registerMutation.mutate({
        email: formData.email,
        password: formData.password,
        name: formData.nickname,
        birth: formData.birth,
        phoneNumber: formData.phone,
      });
      showToast('회원가입이 완료되었습니다.', 'success');
      navigate('/login');
    } catch (error) {
      showToast('회원가입 중 오류가 발생했습니다.', 'error');
    }
  };

  return (
    <div className={COMMON_INPUT_STYLES.formContainer}>
      <Logo />
      <form onSubmit={handleSubmit} className={COMMON_INPUT_STYLES.form}>
        <EmailVerification
          email={formData.email}
          verificationCode={verificationCode}
          onChange={handleChange}
          onVerify={handleCertify}
          onCodeSubmit={handleVerifyCode}
          onCodeChange={setVerificationCode}
          error={errors.email}
        />

        {/* 비밀번호 입력 */}
        <div className={COMMON_INPUT_STYLES.fieldContainer}>
          <div className={COMMON_INPUT_STYLES.labelContainer}>
            <img src={Lock} alt="" className={COMMON_INPUT_STYLES.labelIcon} />
            <label className={COMMON_INPUT_STYLES.label}>비밀번호</label>
          </div>
          <div className={COMMON_INPUT_STYLES.inputContainer}>
            <input
              className={COMMON_INPUT_STYLES.input(!!errors.password)}
              type="password"
              name="password"
              value={formData.password}
              placeholder="비밀번호를 입력하세요"
              onChange={handleChange}
            />
          </div>
          {errors.password && (
            <p className={COMMON_INPUT_STYLES.errorText}>{errors.password}</p>
          )}
        </div>

        {/* 비밀번호 확인 */}
        <div className={COMMON_INPUT_STYLES.fieldContainer}>
          <div className={COMMON_INPUT_STYLES.labelContainer}>
            <img src={Lock} alt="" className={COMMON_INPUT_STYLES.labelIcon} />
            <label className={COMMON_INPUT_STYLES.label}>비밀번호 확인</label>
          </div>
          <div className={COMMON_INPUT_STYLES.inputContainer}>
            <input
              className={COMMON_INPUT_STYLES.input(!!errors.confirmPassword)}
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              placeholder="비밀번호를 다시 입력하세요"
              onChange={handleChange}
            />
          </div>
          {errors.confirmPassword && (
            <p className={COMMON_INPUT_STYLES.errorText}>
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {/* 닉네임 입력 */}
        <div className={COMMON_INPUT_STYLES.fieldContainer}>
          <div className={COMMON_INPUT_STYLES.labelContainer}>
            <img
              src={Person}
              alt=""
              className={COMMON_INPUT_STYLES.labelIcon}
            />
            <label className={COMMON_INPUT_STYLES.label}>닉네임</label>
          </div>
          <div className={COMMON_INPUT_STYLES.inputContainer}>
            <input
              className={COMMON_INPUT_STYLES.input(!!errors.nickname)}
              type="text"
              name="nickname"
              value={formData.nickname}
              placeholder="닉네임을 입력하세요"
              onChange={handleChange}
            />
          </div>
          {errors.nickname && (
            <p className={COMMON_INPUT_STYLES.errorText}>{errors.nickname}</p>
          )}
        </div>

        {/* 생년월일 입력 */}
        <div className={COMMON_INPUT_STYLES.fieldContainer}>
          <div className={COMMON_INPUT_STYLES.labelContainer}>
            <img
              src={Calendar}
              alt=""
              className={COMMON_INPUT_STYLES.labelIcon}
            />
            <label className={COMMON_INPUT_STYLES.label}>생년월일</label>
          </div>
          <div className={COMMON_INPUT_STYLES.inputContainer}>
            <input
              className={COMMON_INPUT_STYLES.input(!!errors.birth)}
              type="date"
              name="birth"
              value={formData.birth}
              onChange={handleChange}
            />
          </div>
          {errors.birth && (
            <p className={COMMON_INPUT_STYLES.errorText}>{errors.birth}</p>
          )}
        </div>

        <button
          type="submit"
          className={COMMON_INPUT_STYLES.submitButton(!isEmailVerified)}
          disabled={!isEmailVerified}
        >
          회원가입
        </button>
      </form>
    </div>
  );
};

export default SignUpBox;
