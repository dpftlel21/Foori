#!/bin/bash
# nginx 설정 적용
sudo cp /etc/nginx/conf.d/nginx.conf /etc/nginx/conf.d/default.conf
sudo chown root:root /etc/nginx/conf.d/default.conf
sudo chmod 644 /etc/nginx/conf.d/default.conf

# nginx 재시작
sudo systemctl restart nginx