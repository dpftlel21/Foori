import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../api/auth';
import Email from '../../../assets/images/email.png';
import Phone from '../../../assets/images/lock.png';
import User from '../../../assets/images/person.png';
import { useToast } from '../../../contexts/ToastContext';
import Logo from '../../common/Logo';

const FindPwBox = () => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phoneNumber: '',
  });
  const [isSearching, setIsSearching] = useState(false);
  const { showToast } = useToast();
  const { useFindPassword } = useAuth();

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
    linkButton: 'text-sm text-[#FF800B] hover:underline mt-4 block text-center',
  } as const;

  const { isLoading } = useFindPassword(
    isSearching ? formData.email : '',
    isSearching ? formData.name : '',
    isSearching ? formData.phoneNumber : '',
    {
      onSuccess: () => {
        showToast('임시 비밀번호가 이메일로 전송되었습니다.', 'success');
        setIsSearching(false);
      },
      onError: (error) => {
        showToast('비밀번호 찾기에 실패했습니다.', 'error');
        setIsSearching(false);
      },
    },
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
  };

  return (
    <>
      <Logo />
      <div className={STYLES.container}>
        <h2 className={STYLES.title}>비밀번호 찾기</h2>
        <form onSubmit={handleSubmit} className={STYLES.form}>
          {/* 이메일 입력 필드 */}
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
          </div>

          {/* 이름 입력 필드 */}
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
          </div>

          {/* 휴대폰 번호 입력 필드 */}
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
              placeholder="휴대폰 번호를 입력하세요 (-포함)"
              className={STYLES.input}
              required
            />
          </div>

          <button type="submit" className={STYLES.button} disabled={isLoading}>
            {isLoading ? '처리 중...' : '임시 비밀번호 받기'}
          </button>

          <Link to="/login" className={STYLES.linkButton}>
            로그인하러 가기
          </Link>
        </form>
      </div>
    </>
  );
};

export default FindPwBox;
