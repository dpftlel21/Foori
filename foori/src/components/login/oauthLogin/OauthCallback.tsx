import { useEffect, useMemo, useState } from 'react';
import {
  useGoogleConnect,
  useKakaoConnect,
  useNaverConnect,
  useOAuthLogin,
} from '../../../hooks/auth/useOauth';

const OauthCallback = () => {
  const { oauthLoginMutation } = useOAuthLogin();
  const kakaoConnectMutation = useKakaoConnect().kakaoConnectMutation;
  const naverConnectMutation = useNaverConnect().naverConnectMutation;
  const googleConnectMutation = useGoogleConnect().googleConnectMutation;
  const [isLoading, setIsLoading] = useState(true);

  // URL 파싱을 useMemo로 최적화
  const { code, provider } = useMemo(() => {
    const params = new URL(window.location.href);
    return {
      code: params.searchParams.get('code'),
      provider: params.pathname.split('/')[2],
    };
  }, []); // 컴포넌트 마운트 시 한 번만 실행

  // 메인 로직을 처리하는 useEffect
  useEffect(() => {
    const actionType = sessionStorage.getItem('oauth_action_type');
    if (!actionType || !code || !provider) {
      setIsLoading(false);
      return;
    }

    const processOAuth = async () => {
      try {
        if (actionType === 'login') {
          await oauthLoginMutation.mutateAsync({ code, provider });
        } else if (actionType === 'connect') {
          switch (provider) {
            case 'kakao':
              await kakaoConnectMutation.mutateAsync(code);
              break;
            case 'naver':
              await naverConnectMutation.mutateAsync(code);
              break;
            case 'google':
              await googleConnectMutation.mutateAsync(code);
              break;
          }
        }
      } finally {
        setIsLoading(false);
        sessionStorage.removeItem('oauth_action_type');
      }
    };

    processOAuth();
  }, [code, provider]);

  return (
    <div className="flex justify-center items-center h-screen">
      {isLoading ? (
        <div className="text-center">
          <div className="mb-4">처리 중입니다...</div>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div>처리가 완료되었습니다</div>
      )}
    </div>
  );
};

export default OauthCallback;
