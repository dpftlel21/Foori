import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../api/auth';
import Phone from '../../../assets/images/lock.png';
import User from '../../../assets/images/person.png';
import { useToast } from '../../../contexts/ToastContext';
import Logo from '../../common/Logo';
const FindIDBox = () => {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
  });
  const [isSearching, setIsSearching] = useState(false);
  const [foundEmail, setFoundEmail] = useState('');
  const [showResult, setShowResult] = useState(false);
  const { showToast } = useToast();
  const { useFindEmail } = useAuth();

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
    resultEmail: 'text-[#FF800B] font-medium text-lg',
    linkButton: 'text-sm text-[#FF800B] hover:underline mt-4 block text-center',
  } as const;

  const { isLoading } = useFindEmail(
    isSearching ? formData.name : '',
    isSearching ? formData.phoneNumber : '',
    {
      onSuccess: (email: string) => {
        setFoundEmail(email);
        setShowResult(true);
        showToast('이메일을 찾았습니다!', 'success');
        setIsSearching(false);
      },
      onError: (error: Error) => {
        showToast('이메일을 찾을 수 없습니다.', 'error');
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

  if (showResult) {
    return (
      <>
        <Logo />
        <div className={STYLES.container}>
          <h2 className={STYLES.title}>이메일 찾기 결과</h2>
          <div className={STYLES.resultBox}>
            <p className={STYLES.resultText}>
              {formData.name}님의 이메일 주소는
            </p>
            <p className={STYLES.resultEmail}>{foundEmail}</p>
            <p className={STYLES.resultText}>입니다.</p>
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
        <h2 className={STYLES.title}>이메일 찾기</h2>
        <form onSubmit={handleSubmit} className={STYLES.form}>
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
            {isLoading ? '찾는 중...' : '이메일 찾기'}
          </button>
        </form>
      </div>
    </>
  );
};

export default FindIDBox;
