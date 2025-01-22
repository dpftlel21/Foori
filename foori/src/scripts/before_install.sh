#!/bin/bash
# 기존 dist 폴더 정리
sudo rm -rf /home/ec2-user/Foori/foori/dist
sudo mkdir -p /home/ec2-user/Foori/foori/dist
sudo chown -R ec2-user:ec2-user /home/ec2-user/Foori/foori/dist