/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_KAKAO_MAP_KEY: string;
  readonly VITE_REDIRECT_URL: string;
  readonly VITE_SOCIAL_LOGIN_URL: string;
  readonly VITE_SOCIAL_CONNECT_URL: string;
  readonly VITE_BACK_URL: string;
  readonly VITE_TOSS_CLIENT_KEY: string;
  readonly VITE_KAKAO_CLIENT_ID: string;
  readonly VITE_KAKAO_CLIENT_SECRET_KEY: string;
  readonly VITE_KAKAO_REDIRECT_URI: string;
  readonly VITE_NAVER_CLIENT_ID: string;
  readonly VITE_NAVER_CLIENT_SECRET_KEY: string;
  readonly VITE_NAVER_REDIRECT_URI: string;
  readonly VITE_GOOGLE_CLIENT_ID: string;
  readonly VITE_GOOGLE_CLIENT_SECRET_KEY: string;
  readonly VITE_GOOGLE_REDIRECT_URI: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
