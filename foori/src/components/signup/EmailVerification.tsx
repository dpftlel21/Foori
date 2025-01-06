import { useState } from 'react';
import Email from '../../assets/images/email.png';

interface EmailVerificationProps {
  email: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onVerify: () => void;
  onCodeSubmit: (code: string) => void;
  error?: string;
}

const EmailVerification = ({
  email,
  onChange,
  onVerify,
  onCodeSubmit,
  error,
}: EmailVerificationProps) => {
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');

  const handleVerifyClick = () => {
    onVerify();
    setShowCodeInput(true);
  };

  const handleCodeSubmit = () => {
    onCodeSubmit(verificationCode);
  };

  return (
    <div className="w-full flex flex-col items-center space-y-2">
      <div className="w-[45%] flex justify-start items-center mb-[1%]">
        <img src={Email} alt="" className="w-[12%]" />
        <label htmlFor="email" className="ml-[1%]">
          이메일
        </label>
      </div>

      <div className="w-[45%] flex gap-2">
        <input
          className={`flex-1 h-[3vh] p-[1%] rounded-md ${
            error ? 'border-red-500' : ''
          }`}
          type="email"
          name="email"
          value={email}
          placeholder="이메일을 입력하세요."
          onChange={onChange}
        />
        <button
          type="button"
          className="w-[25%] bg-[#FF800B] text-white text-sm rounded-md hover:bg-[#fcb69f] transition duration-300 disabled:opacity-50"
          onClick={handleVerifyClick}
          disabled={!email}
        >
          인증하기
        </button>
      </div>

      {showCodeInput && (
        <div className="w-[45%] flex gap-2 mt-2">
          <input
            className="flex-1 h-[3vh] p-[1%] rounded-md border"
            type="text"
            placeholder="인증번호를 입력하세요"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          />
          <button
            type="button"
            className="w-[25%] bg-[#FF800B] text-white text-sm rounded-md hover:bg-[#fcb69f] transition duration-300"
            onClick={handleCodeSubmit}
          >
            확인
          </button>
        </div>
      )}

      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
};

export default EmailVerification;
