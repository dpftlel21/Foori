import { ActionType } from '../../../types/auth.type';

const OauthLogin = ({ actionType }: { actionType: ActionType }) => {
  const kakaoButtonStyle =
    'w-[45%] h-[3.5vh] my-[1%] bg-[#ffea00e4] text-white rounded-md hover:bg-[#e1af39] transition duration-500 ease-in-out text-[#232222c9]';
  const googleBtnStyle =
    'w-[45%] h-[3.5vh] my-[1%] bg-[#e8ece8e4] text-white rounded-md hover:bg-[#e1af39] transition duration-500 ease-in-out text-[#232222c9]';
  const naverBtnStyle =
    'w-[45%] h-[3.5vh] my-[1%] bg-[#00c73c] text-white rounded-md hover:bg-[#00c73c] transition duration-500 ease-in-out text-[#232222c9]';

  const handleOauthLogin = (provider: 'kakao' | 'google' | 'naver') => {
    const baseUrl = import.meta.env.VITE_REDIRECT_URL;

    sessionStorage.setItem('oauth_action_type', String(actionType));

    window.location.href = `${baseUrl}/${provider}`;
  };

  return (
    <div className="w-full flex flex-col items-center gap-2">
      <button
        className={kakaoButtonStyle}
        onClick={() => handleOauthLogin('kakao')}
      >
        Kakao
      </button>
      <button
        className={googleBtnStyle}
        onClick={() => handleOauthLogin('google')}
      >
        Google
      </button>
      <button
        className={naverBtnStyle}
        onClick={() => handleOauthLogin('naver')}
      >
        Naver
      </button>
    </div>
  );
};

export default OauthLogin;
