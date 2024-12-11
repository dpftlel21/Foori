
interface ImportMetaEnv {
  VITE_REDIRECT_URL: string;
  VITE_API_URL: string;
  VITE_CON_URL: string;
}

interface ImportMeta {
  env: ImportMetaEnv;
}
