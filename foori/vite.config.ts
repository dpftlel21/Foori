import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    build: {
      target: 'esnext',
      minify: 'esbuild',
      // 청크 크기 최적화
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            // 큰 라이브러리들 분리
          },
        },
      },
      // 빌드 캐시 활성화
      cache: true,
    },
    server: {
      proxy: {
        '/api': {
          target: env.VITE_BACK_URL,
          changeOrigin: true,
        },
      },
    },
    css: {
      postcss: './postcss.config.js',
    },
  };
});
