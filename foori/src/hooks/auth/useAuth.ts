import {
  QueryClient,
  useMutation,
  useQuery,
  UseQueryOptions,
} from 'react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import * as authApi from '../../api/endpoints/auth';
import { cookieStorage } from '../../api/utils/cookies';
import { useToast } from '../../contexts/ToastContext';

interface VerifyCodeResponse {
  code: string;
  email: string;
}

// 로그인
export const useLogin = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const location = useLocation();
  return useMutation(authApi.loginUser, {
    onSuccess: (data) => {
      if (data.accessToken) {
        cookieStorage.setToken(data.accessToken);
        const from = location.state?.from || '/';
        navigate(from, { replace: true });
      }
    },
    onError: () => {
      showToast('로그인에 실패했습니다.', 'error');
    },
  });
};

// 회원가입
export const useRegister = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useToast();

  const registerMutation = useMutation(authApi.registerUser, {
    onSuccess: (data) => {
      if (data.accessToken) {
        cookieStorage.setToken(data.accessToken);
        const from = location.state?.from || '/';
        navigate(from, { replace: true });
      }
    },
    onError: () => {
      showToast('회원가입에 실패했습니다.', 'error');
    },
  });

  const verifyEmailMutation = useMutation(authApi.verifyEmail);
  const verifyCodeMutation = useMutation<void, Error, VerifyCodeResponse>(
    (params) => authApi.verifyCode(params),
  );

  return {
    registerMutation,
    verifyEmailMutation,
    verifyCodeMutation,
  };
};

// 아이디 찾기
export const useFindEmail = (
  name: string,
  phoneNumber: string,
  options?: Omit<UseQueryOptions<string, Error>, 'queryKey' | 'queryFn'>,
) => {
  return useQuery<string, Error>({
    queryKey: ['findEmail', name, phoneNumber],
    queryFn: async () => {
      const response = await fetch(
        `${
          import.meta.env.VITE_BACK_URL
        }/api/users/find-email?name=${name}&phoneNumber=${phoneNumber}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (!response.ok) {
        throw new Error('이메일을 찾을 수 없습니다.');
      }

      const text = await response.text(); // response.json() 대신 text() 사용
      return text; // 문자열 그대로 반환
    },
    enabled: !!name && !!phoneNumber,
    ...options,
  });
};

// 비밀번호 찾기
export const useFindPassword = (
  email: string,
  name: string,
  phoneNumber: string,
  options?: Omit<UseQueryOptions<string, Error>, 'queryKey' | 'queryFn'>,
) => {
  return useQuery<string, Error>({
    queryKey: ['findPassword', email, name, phoneNumber],
    queryFn: async () => {
      const response = await fetch(
        `${
          import.meta.env.VITE_BACK_URL
        }/api/users/find-password?email=${email}&name=${name}&phoneNumber=${phoneNumber}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (!response.ok) {
        throw new Error('비밀번호 찾기에 실패했습니다.');
      }

      const text = await response.text();
      return text;
    },
    enabled: !!email && !!name && !!phoneNumber,
    ...options,
  });
};

interface TokenResponse {
  accessToken: string;
  refreshToken?: string;
}

// 토큰 리프레시 훅
export const useTokenRefresh = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();

  const refreshTokenMutation = useMutation<TokenResponse, Error>(
    authApi.refreshToken,
    {
      onSuccess: (data) => {
        if (data.accessToken) {
          cookieStorage.setToken(data.accessToken);
          if (data.refreshToken) {
            cookieStorage.setRefreshToken(data.refreshToken);
          }
        }
      },
      onError: (error) => {
        if (error.message === '401') {
          cookieStorage.clearTokens();
          navigate('/login');
          showToast('세션이 만료되었습니다. 다시 로그인해주세요.', 'error');
        }
      },
      retry: false,
    },
  );

  return refreshTokenMutation;
};

// 인터셉터 설정
export const setupAuthInterceptor = (
  queryClient: QueryClient,
  refreshTokenFn: () => Promise<TokenResponse>,
) => {
  // 401 에러 발생 시 토큰 갱신 및 쿼리 재시도
  queryClient.setDefaultOptions({
    queries: {
      retry: (failureCount, error: any) =>
        error?.status === 401 && failureCount === 1,
      retryDelay: (failureCount) => Math.min(1000 * 2 ** failureCount, 30000),
    },
  });
};
