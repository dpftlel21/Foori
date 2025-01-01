# 멀티 스테이지 빌드 최적화
FROM node:18-alpine AS builder
WORKDIR /app

# 종속성 파일 복사
COPY package*.json ./

# npm install 대신 ci 사용
RUN npm ci

# 소스 코드 복사
COPY . .

# 빌드 실행
RUN npm run build

# Nginx 이미지 사용
FROM nginx:alpine

# 빌드 결과물 복사
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 포트 노출
EXPOSE 80

# 기본 명령 실행
CMD ["nginx", "-g", "daemon off;"]
