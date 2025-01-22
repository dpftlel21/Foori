#!/bin/bash
# 기존 파일 정리
if [ -d /home/ec2-user/Foori/foori ]; then
    rm -rf /home/ec2-user/Foori/foori/*
fi

# 디렉토리 생성
mkdir -p /home/ec2-user/Foori/foori