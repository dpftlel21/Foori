import { ActionType } from '../../../types/auth.type';

const OauthLogin = ({ actionType }: { actionType: ActionType }) => {
  const STYLES = {
    container: 'w-full flex flex-col items-center gap-3',
    button: {
      base: `w-full max-w-[400px] h-12 rounded-lg text-sm font-medium
             transition-all duration-300 transform active:scale-95
             flex items-center justify-center gap-2`,
      kakao: `bg-[#FEE500] text-[#000000] hover:bg-[#FEE500]/90
              hover:shadow-lg hover:shadow-[#FEE500]/30
              hover:-translate-y-0.5`,
      google: `bg-white text-[#444746] border border-[#dadce0]
               hover:bg-[#f8f9fa] hover:shadow-lg hover:shadow-gray-200/50
               hover:-translate-y-0.5`,
      naver: `bg-[#03C75A] text-white
              hover:bg-[#02bd54] hover:shadow-lg hover:shadow-[#03C75A]/30
              hover:-translate-y-0.5`,
    },
    icon: {
      size: 'w-5 h-5',
    },
  } as const;

  const handleOauthLogin = (provider: 'kakao' | 'google' | 'naver') => {
    const baseUrl = import.meta.env.VITE_REDIRECT_URL;
    console.log('baseUrl', baseUrl);
    sessionStorage.setItem('oauth_action_type', String(actionType));
    window.location.href = `${baseUrl}/${provider}`;
  };

  return (
    <div className={STYLES.container}>
      <button
        className={`${STYLES.button.base} ${STYLES.button.kakao}`}
        onClick={() => handleOauthLogin('kakao')}
      >
        <svg className={STYLES.icon.size} viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M12 3C6.5 3 2 6.5 2 11c0 3.1 2 5.8 5 7.2l-1 3.8L11 19c.3 0 .7 0 1 .1C17.5 19.1 22 15.6 22 11c0-4.5-4.5-8-10-8"
          />
        </svg>
        카카오로 시작하기
      </button>

      <button
        className={`${STYLES.button.base} ${STYLES.button.google}`}
        onClick={() => handleOauthLogin('google')}
      >
        <svg className={STYLES.icon.size} viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        구글로 시작하기
      </button>

      <button
        className={`${STYLES.button.base} ${STYLES.button.naver}`}
        onClick={() => handleOauthLogin('naver')}
      >
        <svg className={STYLES.icon.size} viewBox="0 0 20 20">
          <path
            fill="currentColor"
            d="M13.5 5.5v9L11 5.5H6.5v9L4 5.5H2l3.5 9h3l2.5-6.5V16h2l2.5-6.5V16H18V5.5z"
          />
        </svg>
        네이버로 시작하기
      </button>
    </div>
  );
};

export default OauthLogin;
