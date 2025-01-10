import { useMutation, useQuery, UseQueryOptions } from 'react-query';
import { useNavigate } from 'react-router-dom';
import {
  LoginData,
  LoginResponse,
  OauthResponse,
  SignUpData,
  SignUpResponse,
} from '../types/auth.type';
import { postData } from './api';
import { cookieStorage } from './cookies';

// 일반 로그인, 회원가입, 이메일 인증, 이메일 검증
export const useAuth = () => {
  const navigate = useNavigate();

  // 이메일 인증 mutation
  const verifyEmailMutation = useMutation({
    mutationFn: (email: string) =>
      postData('api/mail/send-verification', { email }),
    onError: (error) => {
      console.error('이메일 인증 에러:', error);
    },
  });

  // 이메일 검증 mutation
  const verifyCodeMutation = useMutation({
    mutationFn: (code: string) => postData('api/mail/verify-code', { code }),
    onError: (error) => {
      console.error('이메일 검증 에러:', error);
    },
  });

  // 로그인 mutation
  const loginMutation = useMutation<LoginResponse, Error, LoginData>({
    mutationFn: (loginData) => postData('api/auth/login', loginData),
    onSuccess: (data) => {
      // 로그인 성공 시 처리 (예: 토큰 저장)
      if (data.accessToken) {
        cookieStorage.setToken(data.accessToken);
      }
    },
    onError: (error) => {
      console.error('로그인 에러:', error);
    },
  });

  // 로그인 후 토큰을 활용한 유저 정보 조회 (UseQuery)
  const userInfoQuery = useQuery({
    queryKey: ['userInfo'],
    queryFn: async () => {
      const token = cookieStorage.getToken();
      if (!token) {
        throw new Error('토큰이 없습니다');
      }
      const response = await fetch('api/users/user-profile', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      //console.log('response', response);
      if (!response.ok) {
        throw new Error('사용자 정보를 가져오는데 실패했습니다');
      }
      return response.json();
    },
    enabled: !!cookieStorage.getToken(),
    staleTime: 1000 * 60 * 5, // 5분
    cacheTime: 1000 * 60 * 30, // 30분
    refetchOnWindowFocus: false, // 창 포커스 시 재요청 방지
    refetchInterval: false, // 주기적 재요청 방지
    refetchOnMount: false, // 컴포넌트 마운트 시 재요청 방지
  });

  // 회원가입 mutation
  const registerMutation = useMutation<SignUpResponse, Error, SignUpData>({
    mutationFn: (signUpData) => postData('api/auth/register', signUpData),
    onSuccess: (data) => {
      // 회원가입 성공 시 처리
      if (data.accessToken) {
        cookieStorage.setToken(data.accessToken);
      }
    },
    onError: (error) => {
      console.error('회원가입 에러:', error);
    },
  });

  // 소셜 로그인
  const oauthLoginMutation = useMutation<
    OauthResponse,
    Error,
    { code: string; provider: string }
  >({
    mutationFn: async ({ code, provider }) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/${provider}/callback?code=${code}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        },
      );
      console.log('소셜 응답', response);
      return response.json();
    },
    onSuccess: (data: OauthResponse) => {
      if (data.accessToken) {
        cookieStorage.setToken(data.accessToken);
        navigate('/');
      }
    },
    onError: (error) => {
      if (error instanceof Error) {
        alert('마이페이지에서 계정 연동 후 사용 바랍니다.');
      } else {
        alert('로그인에 실패했습니다.');
        navigate('/login');
      }
      console.error('소셜 로그인 에러:', error);
    },
  });

  // 소셜 계정 연동
  const oauthConMutation = useMutation<
    OauthResponse,
    Error,
    { code: string; provider: string }
  >({
    mutationFn: async ({ code, provider }) => {
      const token = cookieStorage.getToken();
      console.log('token', token);
      const response = await fetch(
        `${import.meta.env.VITE_CON_URL}/${provider}/callback?code=${code}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          credentials: 'include',
        },
      );
      console.log('response', response);

      // 응답 상태 확인
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // 응답 내용 확인
      const text = await response.text();
      if (!text) {
        throw new Error('응답이 비어있습니다');
      }

      try {
        return JSON.parse(text);
      } catch (error) {
        console.error('JSON 파싱 에러:', text);
        throw new Error('응답을 파싱할 수 없습니다');
      }
    },
    onSuccess: (data) => {
      if (data.success) {
        //console.log('data', data);
        alert('계정 연동 완료');
        navigate('/mypage');
      }
    },
    onError: (error) => {
      if (error instanceof Error) {
        //console.log('error', error);
        // response status가 401인 경우 확인
        if (error.message.includes('status: 401')) {
          alert('이미 등록된 소셜 계정입니다.');
        } else {
          alert('계정 연동 실패');
        }
        navigate('/mypage');
      }
    },
  });

  // 아이디 찾기
  const useFindEmail = (
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

  // 비밀번호 찾기 함수 정의
  const useFindPassword = (
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

        const text = await response.text(); // response.json() 대신 text() 사용
        return text; // 문자열 그대로 반환
      },
      enabled: !!email && !!name && !!phoneNumber,
      ...options,
    });
  };

  return {
    verifyEmailMutation,
    verifyCodeMutation,
    loginMutation,
    registerMutation,
    userInfoQuery,
    oauthLoginMutation,
    oauthConMutation,
    useFindEmail,
    useFindPassword,
  };
};
