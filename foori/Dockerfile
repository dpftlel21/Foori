# 빌드 스테이지
FROM node:18-alpine AS builder
WORKDIR /app

# 의존성 설치 레이어
COPY package*.json ./
RUN npm ci

# 환경변수 파일 복사
COPY .env .env

# 소스 코드 복사 및 빌드 레이어
COPY . .
RUN npm run build

# 실행 스테이지
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]