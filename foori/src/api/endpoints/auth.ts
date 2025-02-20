import { LoginData, SignUpData } from '../../types/auth.type';
import { getData, postData } from '../api';
import { cookieStorage } from '../utils/cookies';

interface VerifyCodeParams {
  code: string;
  email: string;
}

// 로그인/회원가입 관련
export const loginUser = (loginData: LoginData) =>
  postData('api/auth/login', loginData);

export const registerUser = (signUpData: SignUpData) =>
  postData('api/auth/register', signUpData);

// 이메일 인증 관련
export const verifyEmail = (email: string) =>
  postData('api/mail/send-verification', { email });

export const verifyCode = (params: VerifyCodeParams) =>
  postData('api/mail/verify-code', params);

// 유저 프로필 조회
export const getUserProfile = () => getData('api/users/user-profile');

// 토큰 관련
export const refreshToken = async () => {
  const accessToken = cookieStorage.getToken();

  return postData('api/auth/token/refresh', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const verifyToken = () => getData('api/auth/token/verify');
