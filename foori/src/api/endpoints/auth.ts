import { LoginData, SignUpData } from '../../types/auth.type';
import { getData, postData } from '../api';

export const loginUser = (loginData: LoginData) =>
  postData('api/auth/login', loginData);

export const registerUser = (signUpData: SignUpData) =>
  postData('api/auth/register', signUpData);

export const verifyEmail = (email: string) =>
  postData('api/mail/send-verification', { email });

export const verifyCode = (code: string) =>
  postData('api/mail/verify-code', { code });

export const getUserProfile = () => getData('api/users/user-profile');
