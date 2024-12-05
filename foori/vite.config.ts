import { defineConfig, loadEnv } from 'vite';
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {

  //환경 변수
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: env.VITE_BACK_URL,
          changeOrigin: true,
          //secure: false,
          //credentials: "include",
          //ws: true, // 실시간 채팅, 알림 데이터 업데이트 등,,,
          //rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    css: {
    postcss: './postcss.config.js',
  },
  };
});
