#!/bin/bash
# 권한 설정
sudo chown -R ec2-user:ec2-user /home/ec2-user/Foori

# nginx 설정 복사 및 재시작
sudo cp -f /home/ec2-user/Foori/foori/nginx.conf /etc/nginx/conf.d/default.conf
sudo systemctl restart nginx || echo "Failed to restart nginx"