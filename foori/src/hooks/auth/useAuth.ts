import { useMutation, useQuery, UseQueryOptions } from 'react-query';
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

// 소셜 로그인
export const useOauth = () => {
  const navigate = useNavigate();

  const oauthLoginMutation = useMutation(
    async ({ code, provider }: { code: string; provider: string }) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/${provider}/callback?code=${code}`,
        {
          credentials: 'include',
        },
      );
      return response.json();
    },
    {
      onSuccess: (data) => {
        if (data.accessToken) {
          cookieStorage.setToken(data.accessToken);
          navigate('/');
        }
      },
    },
  );

  return { oauthLoginMutation };
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
