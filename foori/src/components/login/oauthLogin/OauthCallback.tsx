import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../../../api/auth';

const OauthCallback = () => {
  const { oauthLoginMutation, oauthConMutation } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [type, setType] = useState<string | null>(null);

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
    if (!storedType) {
      setIsLoading(false);
      console.error('No stored type found');
      return;
    }

    setType(storedType);

    if (!code || !provider) {
      console.error('Missing code or provider');
      setIsLoading(false);
      return;
    }

    const mutation =
      storedType === 'login' ? oauthLoginMutation : oauthConMutation;

    // 한 번만 실행되도록 보장
    mutation.mutate(
      { code, provider },
      {
        onSuccess: () => setIsLoading(false),
        onError: (error) => {
          console.error('Mutation error:', error);
          setIsLoading(false);
        },
      },
    );
  }, []);

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
