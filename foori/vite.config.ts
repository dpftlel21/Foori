import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          // 자주 변경되지 않는 큰 라이브러리들 분리
          utils: ['axios', 'lodash'],
        },
      },
    },
    // 프로덕션 빌드 최적화
    minify: 'terser',
    sourcemap: false,
    // 청크 크기 최적화
    cssCodeSplit: true,
    assetsInlineLimit: 4096,
  },
  server: {
    port: 5173,
    host: true,
  },
});
