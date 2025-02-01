import { useEffect, useMemo, useState } from 'react';
import { useOauth } from '../../../hooks/auth/useAuth';

const OauthCallback = () => {
  const { oauthMutation } = useOauth();
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
    const storedType = sessionStorage.getItem('oauth_action_type');
    if (!storedType || !code || !provider) {
      setIsLoading(false);
      return;
    }

    const type = storedType === 'connect' ? 'connect' : 'login';

    oauthMutation.mutate(
      { code, provider, type },
      {
        onSettled: () => setIsLoading(false),
      },
    );
  }, [code, provider]);

  return (
    <div className="flex justify-center items-center h-screen">
      {isLoading ? (
        <div className="text-center">
          <div className="mb-4">로그인 처리 중입니다...</div>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div>로그인 콜백 처리 중료</div>
      )}
    </div>
  );
};

export default OauthCallback;
