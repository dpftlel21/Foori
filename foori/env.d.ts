/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_KAKAO_MAP_KEY: string;
  readonly VITE_REDIRECT_URL: string;
  readonly VITE_SOCIAL_LOGIN_URL: string;
  readonly VITE_SOCIAL_CONNECT_URL: string;
  readonly VITE_BACK_URL: string;
  readonly VITE_TOSS_CLIENT_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
