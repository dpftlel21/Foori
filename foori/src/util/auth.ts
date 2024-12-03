import { SignUpData, SignUpResponse, LoginData, LoginResponse } from "./global.type";
import { postData } from "./api";

// 이메일 인증, 회원가입
export const authService = {
  async verifyEmail(email: string) {
    try {
      const response = await postData(
        `${process.env.REACT_APP_BACK_URL}/mail/send-verification`, 
        { email }
      );
      if (!response) {
        throw new Error('서버로부터 응답을 받지 못했습니다.');
      }
      return response;
    } catch (error) {
      console.error('이메일 인증 에러:', error);
      throw error instanceof Error 
        ? error 
        : new Error('이메일 인증 중 오류가 발생했습니다.');
    }
  },

  async register(signUpData: SignUpData): Promise<SignUpResponse> {
    try {
      const response = await postData(
        `${process.env.REACT_APP_BACK_URL}/auth/register`, 
        signUpData
      );

      console.log('response', response);

      if (!response.accessToken) {
        throw new Error(response.message || '회원가입에 실패했습니다.');
      }
      
      return response;
    } catch (error) {
      throw error instanceof Error 
        ? error 
        : new Error('회원가입 중 오류가 발생했습니다.');
    }
  },

  // 로그인
  async login(loginData: LoginData): Promise<LoginResponse> {
    try {
        const response = await postData(
          `${process.env.REACT_APP_BACK_URL}/auth/login`, 
          loginData
      );

      if (!response.accessToken) {
        throw new Error(response.message || '로그인에 실패했습니다.');
      }

      return response;

    } catch (error) {
        throw error instanceof Error 
          ? error 
          : new Error('로그인 중 오류가 발생했습니다.');
      }
  }





};