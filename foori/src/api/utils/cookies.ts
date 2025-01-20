import Cookies from 'js-cookie';

export const cookieStorage = {
  // 인증 관련
  setToken: (token: string) => {
    Cookies.set('token', token, {
      expires: 1 / 24, // 1시간
      path: '/',
      sameSite: 'lax',
    });
  },
  getToken: () => {
    return Cookies.get('token');
  },
  removeToken: () => {
    Cookies.remove('token', { path: '/' });
  },
  setRefreshToken: (token: string) => {
    Cookies.set('refreshToken', token, {
      expires: 7, // 리프레시 토큰은 더 긴 유효기간
      secure: true,
      sameSite: 'strict',
    });
  },
  getRefreshToken: () => {
    return Cookies.get('refreshToken');
  },
  clearTokens: () => {
    Cookies.remove('token');
    Cookies.remove('refreshToken');
  },
};
