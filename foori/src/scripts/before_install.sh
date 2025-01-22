#!/bin/bash
# 기존 파일 정리
if [ -d /home/ec2-user/Foori/foori/dist ]; then
    sudo rm -rf /home/ec2-user/Foori/foori/dist/*
fi

# 디렉토리 생성 및 권한 설정
sudo mkdir -p /home/ec2-user/Foori/foori/dist
sudo chown -R ec2-user:ec2-user /home/ec2-user/Foori/foori/dist
sudo chmod -R 755 /home/ec2-user/Foori/foori/dist