interface ImportMetaEnv {
  VITE_REDIRECT_URL: string;
  VITE_API_URL: string;
  VITE_CON_URL: string;
  VITE_BACK_URL: string;
  VITE_TOSS_CLIENT_KEY: string;
}

interface ImportMeta {
  env: ImportMetaEnv;
}
