#!/bin/bash

# nginx 설정 파일 권한 설정
sudo chown root:root /etc/nginx/conf.d/nginx.conf
sudo chmod 644 /etc/nginx/conf.d/nginx.conf

# nginx 문법 체크
sudo nginx -t

# nginx 재시작
sudo systemctl restart nginx