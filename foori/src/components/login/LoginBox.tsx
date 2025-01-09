import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../api/auth';
import Email from '../../assets/images/email.png';
import Lock from '../../assets/images/lock.png';
import { useToast } from '../../contexts/ToastContext';
import Logo from '../common/Logo';
import OauthLogin from './oauthLogin/OauthLogin';

const LoginBox = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { loginMutation } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const STYLES = {
    container: 'w-full max-w-[400px] bg-white rounded-lg shadow-md p-8 mx-auto',
    form: 'space-y-6',
    inputContainer: 'space-y-2',
    inputWrapper: 'flex items-center gap-2',
    label: 'text-gray-700 text-sm',
    input:
      'w-full h-12 px-4 rounded-lg border text-sm focus:ring-2 focus:ring-[#FF800B] outline-none',
    icon: 'w-5 h-5',
    button:
      'w-full h-12 bg-[#FF800B] text-white text-sm rounded-lg hover:bg-[#fcb69f] transition-colors duration-300 disabled:opacity-50',
    linkContainer: 'flex justify-between text-sm text-gray-600',
    linkGroup: 'flex gap-2',
    link: 'hover:text-[#FF800B] transition-colors',
    divider: {
      container: 'flex items-center my-6',
      line: 'flex-1 h-px bg-gray-300',
      text: 'px-4 text-sm text-gray-500',
    },
  } as const;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await loginMutation.mutateAsync(formData);
      navigate('/');
    } catch (error) {
      showToast('로그인에 실패했습니다.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Logo />
      <div className={STYLES.container}>
        <form onSubmit={handleSubmit} className={STYLES.form}>
          {/* 이메일 입력 */}
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
              disabled={isLoading}
            />
          </div>

          {/* 비밀번호 입력 */}
          <div className={STYLES.inputContainer}>
            <div className={STYLES.inputWrapper}>
              <img src={Lock} alt="lock" className={STYLES.icon} />
              <label className={STYLES.label}>비밀번호</label>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="비밀번호를 입력하세요"
                className={STYLES.input}
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm"
              >
                {showPassword ? '숨기기' : '보기'}
              </button>
            </div>
          </div>

          {/* 로그인 버튼 */}
          <button type="submit" className={STYLES.button} disabled={isLoading}>
            {isLoading ? '로그인 중...' : 'Login'}
          </button>

          {/* 아이디/비밀번호 찾기, 회원가입 */}
          <div className={STYLES.linkContainer}>
            <div className={STYLES.linkGroup}>
              <Link to="/findid" className={STYLES.link}>
                아이디 찾기
              </Link>
              <span className="text-gray-300">|</span>
              <Link to="/findpw" className={STYLES.link}>
                비밀번호 찾기
              </Link>
            </div>
            <Link to="/signup" className={STYLES.link}>
              회원가입
            </Link>
          </div>
        </form>

        {/* 구분선 */}
        <div className={STYLES.divider.container}>
          <div className={STYLES.divider.line}></div>
          <span className={STYLES.divider.text}>또는</span>
          <div className={STYLES.divider.line}></div>
        </div>

        {/* 소셜 로그인 */}
        <OauthLogin actionType="login" />
      </div>
    </>
  );
};

export default LoginBox;
