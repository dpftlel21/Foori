import googleLogo from '../../../../assets/images/google.jpg';
import kakaoLogo from '../../../../assets/images/kakao.jpg';
import naverLogo from '../../../../assets/images/naver.jpg';
import { useKakaoConnect } from '../../../../hooks/auth/useOauth';
import { ActionType } from '../../../../types/auth.type';

const OauthCon = ({ actionType }: { actionType: ActionType }) => {
  const buttonStyle =
    'w-12 h-12 flex items-center justify-center rounded-full hover:bg-gray-50 transition-colors';
  const imageStyle = 'w-10 h-10 rounded-full object-cover';

  const { kakaoConnectMutation } = useKakaoConnect();

  const handleOAuthCon = (provider: 'kakao' | 'naver' | 'google') => {
    const baseUrl = import.meta.env.VITE_REDIRECT_URL;
    console.log('baseUrl', baseUrl);
    sessionStorage.setItem('oauth_action_type', String(actionType));

    window.location.href = `${baseUrl}/${provider}`;

    if (provider === 'kakao') {
      const code = new URL(window.location.href).searchParams.get('code');
      kakaoConnectMutation.mutate(code as string);
    } else return;
  };

  return (
    <div className="flex gap-4 w-full max-w-sm mx-auto px-4 sm:px-0">
      <button className={buttonStyle} onClick={() => handleOAuthCon('kakao')}>
        <img src={kakaoLogo} alt="Kakao" className={imageStyle} />
      </button>
      <button className={buttonStyle} onClick={() => handleOAuthCon('naver')}>
        <img src={naverLogo} alt="Naver" className={imageStyle} />
      </button>
      <button className={buttonStyle} onClick={() => handleOAuthCon('google')}>
        <img src={googleLogo} alt="Google" className={imageStyle} />
      </button>
    </div>
  );
};

export default OauthCon;
