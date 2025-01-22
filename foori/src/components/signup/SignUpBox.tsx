import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from '../../assets/images/calendar.png';
import Email from '../../assets/images/email.png';
import Lock from '../../assets/images/lock.png';
import Person from '../../assets/images/person.png';
import { useRegister } from '../../hooks/auth/useAuth';
//import Phone from '../../assets/images/phone.png';
import { useToast } from '../../contexts/ToastContext';
import { useFormValidation } from '../../hooks/form/useFormValidation';
import Logo from '../common/Logo';

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
    <div className="w-full min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-[#ffecd2] to-[#fcb69f]">
      <Logo />
      <form
        onSubmit={handleSubmit}
        className="w-[90%] md:w-[30%] bg-white bg-opacity-95 rounded-lg shadow-md p-6 space-y-4"
      >
        {/* 이메일 입력 */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <img src={Email} alt="" className="w-5 h-5" />
            <label className="text-gray-700 text-sm">이메일</label>
          </div>
          <div className="flex gap-2">
            <input
              className={`flex-1 px-3 py-2 rounded-lg border text-sm ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-1 focus:ring-[#FF800B]`}
              type="email"
              name="email"
              value={formData.email}
              placeholder="이메일을 입력하세요"
              onChange={handleChange}
            />
            <button
              type="button"
              className="px-3 py-2 bg-[#FF800B] text-white text-sm rounded-lg hover:bg-[#fcb69f] transition duration-300"
              onClick={handleCertify}
            >
              인증
            </button>
          </div>
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email}</p>
          )}
        </div>

        {/* 인증 코드 입력 */}
        {showVerificationInput && (
          <div className="flex gap-2">
            <input
              className="flex-1 px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-[#FF800B]"
              type="text"
              placeholder="인증 코드를 입력하세요"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
            <button
              type="button"
              className="px-3 py-2 bg-[#FF800B] text-white text-sm rounded-lg hover:bg-[#fcb69f] transition duration-300"
              onClick={handleVerifyCode}
            >
              확인
            </button>
          </div>
        )}

        {/* 비밀번호 입력 */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <img src={Lock} alt="" className="w-5 h-5" />
            <label className="text-gray-700 text-sm">비밀번호</label>
          </div>
          <input
            className={`w-full px-3 py-2 text-sm rounded-lg border ${
              errors.password ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-1 focus:ring-[#FF800B]`}
            type="password"
            name="password"
            value={formData.password}
            placeholder="비밀번호를 입력하세요"
            onChange={handleChange}
          />
          {errors.password && (
            <p className="text-red-500 text-xs">{errors.password}</p>
          )}
        </div>

        {/* 비밀번호 확인 */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <img src={Lock} alt="" className="w-5 h-5" />
            <label className="text-gray-700 text-sm">비밀번호 확인</label>
          </div>
          <input
            className={`w-full px-3 py-2 text-sm rounded-lg border ${
              errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-1 focus:ring-[#FF800B]`}
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            placeholder="비밀번호를 다시 입력하세요"
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs">{errors.confirmPassword}</p>
          )}
        </div>

        {/* 생년월일 입력 */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <img src={Calendar} alt="" className="w-5 h-5" />
            <label className="text-gray-700 text-sm">생년월일</label>
          </div>
          <input
            className={`w-full px-3 py-2 text-sm rounded-lg border ${
              errors.birth ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-1 focus:ring-[#FF800B]`}
            type="date"
            name="birth"
            value={formData.birth}
            onChange={handleChange}
          />
          {errors.birth && (
            <p className="text-red-500 text-xs">{errors.birth}</p>
          )}
        </div>

        {/* 휴대폰 번호 입력 */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <img src={Lock} alt="" className="w-5 h-5" />
            <label className="text-gray-700 text-sm">휴대폰 번호</label>
          </div>
          <input
            className={`w-full px-3 py-2 text-sm rounded-lg border ${
              errors.phone ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-1 focus:ring-[#FF800B]`}
            type="tel"
            name="phone"
            value={formData.phone}
            placeholder="휴대폰 번호를 입력하세요"
            onChange={handleChange}
          />
          {errors.phone && (
            <p className="text-red-500 text-xs">{errors.phone}</p>
          )}
        </div>

        {/* 닉네임 입력 */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <img src={Person} alt="" className="w-5 h-5" />
            <label className="text-gray-700 text-sm">닉네임</label>
          </div>
          <input
            className={`w-full px-3 py-2 text-sm rounded-lg border ${
              errors.nickname ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-1 focus:ring-[#FF800B]`}
            type="text"
            name="nickname"
            value={formData.nickname}
            placeholder="닉네임을 입력하세요"
            onChange={handleChange}
          />
          {errors.nickname && (
            <p className="text-red-500 text-xs">{errors.nickname}</p>
          )}
        </div>

        <button
          type="submit"
          className={`w-full py-2.5 bg-[#FF800B] text-white text-sm rounded-lg font-medium
            hover:bg-[#fcb69f] transition duration-300
            ${!isEmailVerified ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={!isEmailVerified}
        >
          회원가입
        </button>
      </form>
    </div>
  );
};

export default SignUpBox;
