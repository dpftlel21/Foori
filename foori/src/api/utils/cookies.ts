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
};