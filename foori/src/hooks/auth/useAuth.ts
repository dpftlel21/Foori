import axios, { AxiosError } from 'axios';
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
  const verifyCodeMutation = useMutation(authApi.verifyCode);

  return {
    registerMutation,
    verifyEmailMutation,
    verifyCodeMutation,
  };
};

// 소셜 로그인/연동 통합 훅
export const useOauth = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const oauthMutation = useMutation(
    async ({
      code,
      provider,
      type,
    }: {
      code: string;
      provider: string;
      type: 'login' | 'connect';
    }) => {
      const baseUrl =
        type === 'login'
          ? import.meta.env.VITE_SOCIAL_LOGIN_URL
          : import.meta.env.VITE_SOCIAL_CONNECT_URL;

      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };

      // 연동시에만 토큰 추가
      if (type === 'connect') {
        const token = cookieStorage.getToken();
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }
      }

      const response = await fetch(
        `${baseUrl}/${provider}/callback?code=${code}`,
        {
          method: 'GET',
          headers,
          credentials: 'include',
        },
      );
      return response.json();
    },
    {
      onSuccess: (data, variables) => {
        if (variables.type === 'login' && data.accessToken) {
          cookieStorage.setToken(data.accessToken);
          navigate('/');
        } else if (variables.type === 'connect') {
          showToast('계정 연동이 완료되었습니다.', 'success');
          navigate('/mypage');
        }
      },
      onError: (error, variables) => {
        const action = variables.type === 'login' ? '로그인' : '계정 연동';
        showToast(`${action}에 실패했습니다.`, 'error');
      },
    },
  );

  return { oauthMutation };
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

// 리프레시 토큰 관련 타입
interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

// 토큰 리프레시 훅
export const useTokenRefresh = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();

  const refreshTokenMutation = useMutation<TokenResponse, AxiosError>(
    authApi.refreshToken,
    {
      onSuccess: (data) => {
        if (data.accessToken) {
          cookieStorage.setToken(data.accessToken);
          if (data.refreshToken) {
            console.log('refreshToken', data.refreshToken);
            cookieStorage.setRefreshToken(data.refreshToken);
          }
        }
      },
      onError: (error) => {
        if (error.response?.status === 401) {
          // 리프레시 토큰도 만료된 경우
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

// 자동 토큰 갱신을 위한 인터셉터 설정
export const setupAuthInterceptor = (
  queryClient: QueryClient,
  refreshTokenFn: () => Promise<TokenResponse>,
) => {
  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401 && !error.config._retry) {
        error.config._retry = true;
        try {
          const result = await refreshTokenFn();
          if (result.accessToken) {
            cookieStorage.setToken(result.accessToken);
            error.config.headers[
              'Authorization'
            ] = `Bearer ${result.accessToken}`;
            return axios(error.config);
          }
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    },
  );
};
