#!/bin/bash
cd /home/ec2-user/Foori
npm run build
sudo cp nginx.conf /etc/nginx/conf.d/default.conf
sudo systemctl restart nginx