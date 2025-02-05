import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { cookieStorage } from '../../api/utils/cookies';
import { useToast } from '../../contexts/ToastContext';

// 기존 로그인 로직은 유지 (통합)
export const useOAuthLogin = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const oauthLoginMutation = useMutation(
    async ({ code, provider }: { code: string; provider: string }) => {
      const response = await fetch(
        `${process.env.VITE_SOCIAL_LOGIN_URL}/${provider}/callback?code=${code}`,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
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
      onError: () => {
        showToast('소셜 로그인에 실패했습니다.', 'error');
      },
    },
  );

  return { oauthLoginMutation };
};

// 카카오 연동
export const useKakaoConnect = () => {
  const token = cookieStorage.getToken();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const kakaoConnectMutation = useMutation(
    async (code: string) => {
      try {
        // 1. 먼저 카카오 토큰 받기
        const kakaoTokenResponse = await fetch(
          `https://kauth.kakao.com/oauth/token`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
              grant_type: 'authorization_code',
              client_id: import.meta.env.VITE_KAKAO_CLIENT_ID!,
              redirect_uri: import.meta.env.VITE_KAKAO_REDIRECT_URI!,
              client_secret: import.meta.env.VITE_KAKAO_CLIENT_SECRET_KEY!,
              code,
            }),
          },
        );
        //console.log('kakaoTokenResponse', kakaoTokenResponse);
        const kakaoToken = await kakaoTokenResponse.json();

        // 2. 카카오 사용자 정보 가져오기
        const userInfoResponse = await fetch(
          'https://kapi.kakao.com/v2/user/me',
          {
            headers: {
              Authorization: `Bearer ${kakaoToken.access_token}`,
            },
          },
        );
        const userInfo = await userInfoResponse.json();

        // 3. 백엔드로 카카오 데이터 전송
        const response = await fetch(
          `${import.meta.env.VITE_SOCIAL_CONNECT_URL}/kakao`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              kakaoAccessToken: kakaoToken.access_token,
              email: userInfo.kakao_account.email,
              nickname: userInfo.properties.nickname,
              profileImage: userInfo.properties.profile_image,
            }),
          },
        );
        return response.json();
      } catch (error) {
        throw new Error('카카오 계정 연동 실패');
      }
    },
    {
      onSuccess: () => {
        showToast('카카오 계정 연동이 완료되었습니다.', 'success');
        navigate('/mypage');
      },
      onError: () => {
        showToast('카카오 계정 연동에 실패했습니다.', 'error');
      },
    },
  );

  return { kakaoConnectMutation };
};

// 네이버 연동
export const useNaverConnect = () => {
  const token = cookieStorage.getToken();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const naverConnectMutation = useMutation(
    async (code: string) => {
      try {
        // 1. 네이버 토큰 받기
        const state = sessionStorage.getItem('naver_state');
        const naverTokenResponse = await fetch(
          `https://nid.naver.com/oauth2.0/token`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
              grant_type: 'authorization_code',
              client_id: import.meta.env.VITE_NAVER_CLIENT_ID!,
              client_secret: import.meta.env.VITE_NAVER_CLIENT_SECRET!,
              code,
              state: state!,
            }),
          },
        );
        const naverToken = await naverTokenResponse.json();

        // 2. 네이버 사용자 정보 가져오기
        const userInfoResponse = await fetch(
          'https://openapi.naver.com/v1/nid/me',
          {
            headers: {
              Authorization: `Bearer ${naverToken.access_token}`,
            },
          },
        );
        const userInfo = await userInfoResponse.json();

        // 3. 백엔드로 네이버 데이터 전송
        const response = await fetch(
          `${import.meta.env.VITE_SOCIAL_CONNECT_URL}/naver`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              naverAccessToken: naverToken.access_token,
              email: userInfo.response.email,
              nickname: userInfo.response.nickname,
              profileImage: userInfo.response.profile_image,
            }),
          },
        );
        return response.json();
      } catch (error) {
        throw new Error('네이버 계정 연동 실패');
      }
    },
    {
      onSuccess: () => {
        showToast('네이버 계정 연동이 완료되었습니다.', 'success');
        navigate('/mypage');
      },
      onError: () => {
        showToast('네이버 계정 연동에 실패했습니다.', 'error');
      },
    },
  );

  return { naverConnectMutation };
};

// 구글 연동
export const useGoogleConnect = () => {
  const token = cookieStorage.getToken();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const googleConnectMutation = useMutation(
    async (code: string) => {
      try {
        // 1. 구글 토큰 받기
        const googleTokenResponse = await fetch(
          'https://oauth2.googleapis.com/token',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
              code,
              client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID!,
              client_secret: import.meta.env.VITE_GOOGLE_CLIENT_SECRET!,
              redirect_uri: import.meta.env.VITE_GOOGLE_REDIRECT_URI!,
              grant_type: 'authorization_code',
            }),
          },
        );
        const googleToken = await googleTokenResponse.json();

        // 2. 구글 사용자 정보 가져오기
        const userInfoResponse = await fetch(
          'https://www.googleapis.com/oauth2/v2/userinfo',
          {
            headers: {
              Authorization: `Bearer ${googleToken.access_token}`,
            },
          },
        );
        const userInfo = await userInfoResponse.json();

        // 3. 백엔드로 구글 데이터 전송
        const response = await fetch(
          `${import.meta.env.VITE_SOCIAL_CONNECT_URL}/google`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              googleAccessToken: googleToken.access_token,
              email: userInfo.email,
              name: userInfo.name,
              picture: userInfo.picture,
            }),
          },
        );
        return response.json();
      } catch (error) {
        throw new Error('구글 계정 연동 실패');
      }
    },
    {
      onSuccess: () => {
        showToast('구글 계정 연동이 완료되었습니다.', 'success');
        navigate('/mypage');
      },
      onError: () => {
        showToast('구글 계정 연동에 실패했습니다.', 'error');
      },
    },
  );

  return { googleConnectMutation };
};
