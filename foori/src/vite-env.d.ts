interface ImportMetaEnv {
  VITE_REDIRECT_URL: string;
  VITE_SOCIAL_LOGIN_URL: string;
  VITE_SOCIAL_CONNECT_URL: string;
  VITE_BACK_URL: string;
  VITE_TOSS_CLIENT_KEY: string;
}

interface ImportMeta {
  env: ImportMetaEnv;
}
