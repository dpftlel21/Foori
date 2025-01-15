import { ChangeEvent, FormEvent } from 'react';
import Email from '../../assets/images/email.png';
import Lock from '../../assets/images/lock.png';

interface LoginFormProps {
  formData: {
    email: string;
    password: string;
  };
  isLoading: boolean;
  showPassword: boolean;
  onSubmit: (e: FormEvent) => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onTogglePassword: () => void;
}

const STYLES = {
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
  link: 'hover:text-[#FF800B] transition-colors',
} as const;

const LoginForm = ({
  formData,
  isLoading,
  showPassword,
  onSubmit,
  onChange,
  onTogglePassword,
}: LoginFormProps) => {
  return (
    <form onSubmit={onSubmit} className={STYLES.form}>
      <div className={STYLES.inputContainer}>
        <div className={STYLES.inputWrapper}>
          <img src={Email} alt="email" className={STYLES.icon} />
          <label className={STYLES.label}>이메일</label>
        </div>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={onChange}
          placeholder="이메일을 입력하세요"
          className={STYLES.input}
          disabled={isLoading}
        />
      </div>

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
            onChange={onChange}
            placeholder="비밀번호를 입력하세요"
            className={STYLES.input}
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={onTogglePassword}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm"
          >
            {showPassword ? '숨기기' : '보기'}
          </button>
        </div>
      </div>

      <button type="submit" className={STYLES.button} disabled={isLoading}>
        {isLoading ? '로그인 중...' : 'Login'}
      </button>

      <div className={STYLES.linkContainer}>
        <div className="flex gap-2">
          <a href="/findid" className={STYLES.link}>
            아이디 찾기
          </a>
          <span className="text-gray-300">|</span>
          <a href="/findpw" className={STYLES.link}>
            비밀번호 찾기
          </a>
        </div>
        <a href="/signup" className={STYLES.link}>
          회원가입
        </a>
      </div>
    </form>
  );
};

export default LoginForm;
