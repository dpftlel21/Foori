import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from '../../assets/images/calendar.png';
import Lock from '../../assets/images/lock.png';
import Person from '../../assets/images/person.png';
import Phone from '../../assets/images/phone.png';
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
  const { registerMutation } = useRegister();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted', formData);

    if (!isEmailVerified) {
      showToast('이메일 인증이 필요합니다.', 'warning');
      return;
    }

    if (!validateForm()) {
      return;
    }

    try {
      await registerMutation.mutateAsync({
        email: formData.email,
        password: formData.password,
        name: formData.nickname,
        birth: formData.birth,
        phoneNumber: formData.phone,
      });
      showToast('회원가입이 완료되었습니다.', 'success');
      navigate('/login');
    } catch (error) {
      console.error('Registration error:', error);
      showToast('회원가입 중 오류가 발생했습니다.', 'error');
    }
  };

  return (
    <div className={COMMON_INPUT_STYLES.formContainer}>
      <Logo />
      <form onSubmit={handleSubmit} className={COMMON_INPUT_STYLES.form}>
        <EmailVerification
          email={formData.email}
          onChange={handleChange}
          onVerificationComplete={() => setIsEmailVerified(true)}
          error={errors.email}
        />

        {/* 비밀번호 입력 */}
        <div className={COMMON_INPUT_STYLES.fieldContainer}>
          <div className={COMMON_INPUT_STYLES.labelContainer}>
            <img src={Lock} alt="" className={COMMON_INPUT_STYLES.labelIcon} />
            <label className={COMMON_INPUT_STYLES.label}>비밀번호</label>
          </div>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="비밀번호를 입력하세요"
            className={COMMON_INPUT_STYLES.input(!!errors.password)}
            required
          />
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
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="비밀번호를 다시 입력하세요"
            className={COMMON_INPUT_STYLES.input(!!errors.confirmPassword)}
            required
          />
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
          <input
            type="text"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
            placeholder="닉네임을 입력하세요"
            className={COMMON_INPUT_STYLES.input(!!errors.nickname)}
            required
          />
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
          <input
            type="date"
            name="birth"
            value={formData.birth}
            onChange={handleChange}
            className={COMMON_INPUT_STYLES.input(!!errors.birth)}
            required
          />
          {errors.birth && (
            <p className={COMMON_INPUT_STYLES.errorText}>{errors.birth}</p>
          )}
        </div>

        {/* 휴대폰 번호 입력 */}
        <div className={COMMON_INPUT_STYLES.fieldContainer}>
          <div className={COMMON_INPUT_STYLES.labelContainer}>
            <img src={Phone} alt="" className={COMMON_INPUT_STYLES.labelIcon} />
            <label className={COMMON_INPUT_STYLES.label}>휴대폰 번호</label>
          </div>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="휴대폰 번호를 입력하세요"
            className={COMMON_INPUT_STYLES.input(!!errors.phone)}
            required
          />
          {errors.phone && (
            <p className={COMMON_INPUT_STYLES.errorText}>{errors.phone}</p>
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
