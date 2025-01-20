# 빌드 스테이지
FROM node:18-alpine AS builder
WORKDIR /app

# 의존성 설치 레이어 (캐시 활용)
COPY package*.json ./
RUN npm ci --silent

# 소스 코드 복사 및 빌드
COPY . .
RUN npm run build

# 프로덕션 스테이지
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Nginx 최적화
RUN nginx -t && \
    rm -rf /var/cache/apk/* && \
    rm -rf /tmp/*

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]