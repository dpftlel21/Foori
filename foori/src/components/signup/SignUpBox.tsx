import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../api/auth';
import Calendar from '../../assets/images/calendar.png';
import Email from '../../assets/images/email.png';
import Lock from '../../assets/images/lock.png';
import Person from '../../assets/images/person.png';
import { useFormValidation } from '../../hooks/useFormValidation';
import Logo from '../common/Logo';
const SignUpBox = () => {
  const navigate = useNavigate();
  const { registerMutation, verifyEmailMutation } = useAuth();

  const SignUpBox =
    'w-[35%] h-[60%] flex flex-col justify-center items-center bg-gray-100 bg-opacity-40 border border-gray-400 rounded-md shadow-md text-sm';
  const InputContainer =
    'w-full flex flex-col justify-center items-center my-[1%]';
  const InputStyle = 'w-[45%] h-[3vh] p-[1%] rounded-md ';
  const InputTitle = 'w-[45%] flex justify-start items-center mb-[1%]';
  const ButtonStyle =
    'w-[25%] h-[5vh] mt-[4%] bg-[#FF800B] text-white rounded-md hover:bg-[#fcb69f] transition duration-500 ease-in-out';

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
      await verifyEmailMutation.mutate(formData.email);
      alert('인증 메일이 발송되었습니다.');
    } catch (error) {
      console.log(
        error instanceof Error
          ? error.message
          : '인증 메일 발송에 실패했습니다.',
      );
    } finally {
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!validateForm()) {
        return;
      }

      const signUpData = {
        email: formData.email,
        password: formData.password,
        name: formData.nickname,
        birth: formData.birth,
        phoneNumber: formData.phone,
      };

      await registerMutation.mutate(signUpData);
    } catch (error) {
      console.log(
        error instanceof Error
          ? error.message
          : '회원가입 중 오류가 발생했습니다.',
      );
    } finally {
      alert('회원가입이 완료되었습니다.');
      navigate('/login');
    }
  };

  return (
    <>
      <Logo />
      <form onSubmit={handleSubmit} className={SignUpBox}>
        {/* 이메일 입력 */}
        <div className={InputContainer}>
          <div className={InputTitle}>
            <img src={Email} alt="" className="w-[12%]" />
            <label htmlFor="email" className="ml-[1%]">
              이메일
            </label>
            <button
              type="button"
              className="w-[25%] h-[3vh] ml-[1%] bg-[#FF800B] text-white text-xs rounded-md hover:bg-[#fcb69f] transition duration-500 ease-in-out"
              onClick={handleCertify}
            >
              인증하기
            </button>
          </div>
          <input
            className={`${InputStyle} ${errors.email ? 'border-red-500' : ''}`}
            type="email"
            name="email"
            value={formData.email}
            placeholder="이메일을 입력하세요."
            onChange={handleChange}
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email}</p>
          )}
        </div>

        {/* 비밀번호 입력 */}
        <div className={InputContainer}>
          <div className={InputTitle}>
            <img src={Lock} alt="" className="w-[12%]" />
            <label htmlFor="password" className="ml-[1%]">
              비밀번호
            </label>
          </div>
          <input
            className={`${InputStyle} ${
              errors.password ? 'border-red-500' : ''
            }`}
            type="password"
            name="password"
            value={formData.password}
            placeholder="비밀번호를 입력하세요."
            onChange={handleChange}
          />
          {errors.password && (
            <p className="text-red-500 text-xs">{errors.password}</p>
          )}
        </div>

        {/* 비밀번호 확인 */}
        <div className={InputContainer}>
          <div className={InputTitle}>
            <img src={Lock} alt="" className="w-[12%]" />
            <label htmlFor="confirmPassword" className="ml-[1%]">
              비밀번호 확인
            </label>
          </div>
          <input
            className={`${InputStyle} ${
              errors.confirmPassword ? 'border-red-500' : ''
            }`}
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            placeholder="비밀번호를 다시 입력하세요."
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs">{errors.confirmPassword}</p>
          )}
        </div>
        {/* 생년월일 입력 */}
        <div className={InputContainer}>
          <div className={InputTitle}>
            <img src={Calendar} alt="사람 모양" className="w-[12%]" />
            <label htmlFor="birth" className="ml-[1%]">
              생년월일
            </label>
          </div>
          <input
            className={`${InputStyle} ${errors.birth ? 'border-red-500' : ''}`}
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
        <div className={InputContainer}>
          <div className={InputTitle}>
            <img src={Calendar} alt="" className="w-[12%]" />
            <label htmlFor="phone" className="ml-[1%]">
              휴대폰 번호
            </label>
          </div>
          <input
            className={`${InputStyle} ${errors.phone ? 'border-red-500' : ''}`}
            type="tel"
            name="phone"
            value={formData.phone}
            placeholder="휴대폰 번호를 입력하세요."
            onChange={handleChange}
          />
        </div>
        {/* 닉네임 입력 */}
        <div className={InputContainer}>
          <div className={InputTitle}>
            <img src={Person} alt="" className="w-[12%]" />
            <label htmlFor="nickname" className="ml-[1%]">
              닉네임
            </label>
          </div>
          <input
            className={`${InputStyle} ${
              errors.nickname ? 'border-red-500' : ''
            }`}
            type="text"
            name="nickname"
            value={formData.nickname}
            placeholder="닉네임을 입력하세요."
            onChange={handleChange}
          />
          {errors.nickname && (
            <p className="text-red-500 text-xs">{errors.nickname}</p>
          )}
        </div>
        {/* 완료 버튼 */}
        <button type="submit" className={ButtonStyle}>
          완료하기
        </button>
      </form>
    </>
  );
};

export default SignUpBox;
