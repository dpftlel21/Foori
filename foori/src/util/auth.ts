import { useMutation, useQuery } from 'react-query';
import { LoginData, LoginResponse, SignUpData, SignUpResponse, OauthResponse } from '../util/global.type';
import { postData } from '../util/api';
import { cookieStorage } from '../util/cookies';
import { useNavigate } from 'react-router-dom';

// 일반 로그인, 회원가입, 이메일 인증
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
      const response = await fetch('api/users/user-profile', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      //console.log("response", response);
      if (!response.ok) {
        throw new Error('사용자 정보를 가져오는데 실패했습니다');
      }

      return response.json();
    },
    enabled: !!cookieStorage.getToken(),
    staleTime: 1000 * 60 * 5, // 5분
    cacheTime: 1000 * 60 * 30, // 30분
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
      //console.log("소셜 응답", response);
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
      console.log("response", response);

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

  return {
    verifyEmailMutation,
    loginMutation,
    registerMutation,
    userInfoQuery,
    oauthLoginMutation,
    oauthConMutation,
  };
};
