import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  build: {
    // 빌드 최적화
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'], // React 관련 패키지만 분리
        },
      },
    },
    // 빌드 성능 및 결과물 최적화
    minify: 'terser',
    sourcemap: false, // 프로덕션에서는 소스맵 비활성화
    cssCodeSplit: true, // CSS 코드 분할
    assetsInlineLimit: 4096, // 작은 에셋은 인라인으로 처리
    chunkSizeWarningLimit: 1000, // 청크 크기 경고 제한
  },
  server: {
    port: 5173,
    host: true, // 외부 접속 허용
  },
});
