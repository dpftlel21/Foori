# 멀티 스테이지 빌드 최적화
FROM node:18-alpine AS builder
WORKDIR /app

# 캐시 활용을 위해 package.json 먼저 복사
COPY package*.json ./
RUN npm ci --silent  # npm install 대신 ci 사용

# 소스 코드 복사 및 빌드
COPY . .
RUN npm run build

# 프로덕션 이미지
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 불필요한 파일 제거
RUN rm -rf /var/cache/apk/* && \
    rm -rf /tmp/*

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]