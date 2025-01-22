#!/bin/bash

# 기존 dist 폴더 정리
if [ -d /home/ec2-user/Foori/foori/dist ]; then
    rm -rf /home/ec2-user/Foori/foori/dist
fi

# 디렉토리 생성
mkdir -p /home/ec2-user/Foori/foori/dist