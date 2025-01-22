#!/bin/bash
cd /home/ec2-user/Foori/foori

# nginx 설정 복사 및 재시작
sudo cp nginx.conf /etc/nginx/conf.d/default.conf
sudo systemctl restart nginx