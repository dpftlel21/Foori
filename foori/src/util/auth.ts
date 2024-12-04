import { useMutation, useQuery } from 'react-query';
import { LoginData, LoginResponse, SignUpData, SignUpResponse } from '../util/global.type';
import { postData } from '../util/api';




export const useAuth = () => {
  // 이메일 인증 mutation
  const verifyEmailMutation = useMutation({
    mutationFn: (email: string) => 
      postData(`${import.meta.env.VITE_BACK_URL}/mail/send-verification`, { email }),
    onError: (error) => {
      console.error('이메일 인증 에러:', error);
    }
  });

  // 로그인 mutation
  const loginMutation = useMutation<LoginResponse, Error, LoginData>({
    mutationFn: (loginData) => 
      postData(`${import.meta.env.VITE_BACK_URL}/auth/login`, loginData),
    onSuccess: (data) => {
      // 로그인 성공 시 처리 (예: 토큰 저장)
      if (data.accessToken) {
        localStorage.setItem('token', data.accessToken);
      }
    },
    onError: (error) => {
      console.error('로그인 에러:', error);
    }
  });

  // 로그인 후 토큰을 활용한 유저 정보 조회 (UseQuery)
  const userInfoQuery = useQuery({
    queryKey: ['userInfo'],
    queryFn: async () => {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `${import.meta.env.VITE_BACK_URL}/users/user-profile`, 
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      //console.log("response", response);
      if (!response.ok) {
        throw new Error('사용자 정보를 가져오는데 실패했습니다');
      }
      
      return response.json();
    },
    enabled: !!localStorage.getItem('token'),
    staleTime: 1000 * 60 * 5, // 5분
    cacheTime: 1000 * 60 * 30 // 30분
  });

  // 회원가입 mutation
  const registerMutation = useMutation<SignUpResponse, Error, SignUpData>({
    mutationFn: (signUpData) => 
      postData(`${import.meta.env.VITE_BACK_URL}/auth/register`, signUpData),
    onSuccess: (data) => {
      // 회원가입 성공 시 처리
      if (data.accessToken) {
        localStorage.setItem('token', data.accessToken);
      }
    },
    onError: (error) => {
      console.error('회원가입 에러:', error);
    }
  });

  return {
    verifyEmailMutation,
    loginMutation,
    registerMutation,
    userInfoQuery
  };
};