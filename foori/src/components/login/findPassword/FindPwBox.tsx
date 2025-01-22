import { useState } from 'react';
import { Link } from 'react-router-dom';
import Email from '../../../assets/images/email.png';
import Phone from '../../../assets/images/lock.png';
import User from '../../../assets/images/person.png';
import { useToast } from '../../../contexts/ToastContext';
import { useFindPassword } from '../../../hooks/auth/useAuth';
import { useFormValidation } from '../../../hooks/form/useFormValidation';
import Logo from '../../common/Logo';

const FindPwBox = () => {
  const [showResult, setShowResult] = useState(false);
  const { showToast } = useToast();

  // 유효성 검사
  const { formData, errors, handleChange, validateForm } = useFormValidation(
    {
      email: '',
      name: '',
      phoneNumber: '',
    },
    'findAccount',
  );

  // 비밀번호 찾기
  const { data, isLoading, refetch } = useFindPassword(
    formData.email,
    formData.name,
    formData.phoneNumber,
    { enabled: false },
  );

  // 비밀번호 찾기 버튼 클릭
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const result = await refetch();
        if (result.data) {
          setShowResult(true);
        }
      } catch (error) {
        showToast('비밀번호 찾기에 실패했습니다.', 'error');
      }
    }
  };

  // 스타일
  const STYLES = {
    container:
      'w-[90%] max-w-[400px] bg-white rounded-lg shadow-md p-8 mx-auto',
    title: 'text-2xl font-bold text-center mb-8',
    form: 'space-y-6',
    inputContainer: 'space-y-2',
    inputWrapper: 'flex items-center gap-2',
    label: 'text-gray-700 text-sm',
    input:
      'w-full h-12 px-4 rounded-lg border text-sm focus:ring-2 focus:ring-[#FF800B] outline-none',
    icon: 'w-5 h-5',
    button:
      'w-full h-12 bg-[#FF800B] text-white text-sm rounded-lg hover:bg-[#fcb69f] transition-all duration-300 disabled:opacity-50 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#FF800B]/30',
    resultBox: 'p-6 bg-gray-50 rounded-lg text-center space-y-4',
    resultText: 'text-gray-600 text-sm',
    resultPassword: 'text-[#FF800B] font-medium text-lg',
    linkButton: 'text-sm text-[#FF800B] hover:underline mt-4 block text-center',
    errorText: 'text-red-500 text-xs mt-1',
  } as const;

  // 결과 화면
  if (showResult && data) {
    return (
      <>
        <Logo />
        <div className={STYLES.container}>
          <h2 className={STYLES.title}>임시 비밀번호 발급</h2>
          <div className={STYLES.resultBox}>
            <p className={STYLES.resultText}>
              {formData.name}님의 임시 비밀번호는
            </p>
            <p className={STYLES.resultPassword}>{data}</p>
            <p className={STYLES.resultText}>입니다.</p>
            <p className={STYLES.resultText}>
              로그인 후 반드시 비밀번호를 변경해주세요.
            </p>
          </div>
          <Link to="/login" className={STYLES.linkButton}>
            로그인하러 가기
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Logo />
      <div className={STYLES.container}>
        <h2 className={STYLES.title}>비밀번호 찾기</h2>
        <form onSubmit={handleSubmit} className={STYLES.form}>
          <div className={STYLES.inputContainer}>
            <div className={STYLES.inputWrapper}>
              <img src={Email} alt="email" className={STYLES.icon} />
              <label className={STYLES.label}>이메일</label>
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="이메일을 입력하세요"
              className={STYLES.input}
              required
            />
            {errors.email && <p className={STYLES.errorText}>{errors.email}</p>}
          </div>

          <div className={STYLES.inputContainer}>
            <div className={STYLES.inputWrapper}>
              <img src={User} alt="user" className={STYLES.icon} />
              <label className={STYLES.label}>이름</label>
            </div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="이름을 입력하세요"
              className={STYLES.input}
              required
            />
            {errors.name && <p className={STYLES.errorText}>{errors.name}</p>}
          </div>

          <div className={STYLES.inputContainer}>
            <div className={STYLES.inputWrapper}>
              <img src={Phone} alt="phone" className={STYLES.icon} />
              <label className={STYLES.label}>휴대폰 번호</label>
            </div>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="휴대폰 번호를 입력하세요"
              className={STYLES.input}
              required
            />
            {errors.phoneNumber && (
              <p className={STYLES.errorText}>{errors.phoneNumber}</p>
            )}
          </div>

          <button
            type="submit"
            className={STYLES.button}
            disabled={isLoading || Object.keys(errors).length > 0}
          >
            {isLoading ? '처리 중...' : '임시 비밀번호 받기'}
          </button>
        </form>
      </div>
    </>
  );
};

export default FindPwBox;
