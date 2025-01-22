#!/bin/bash
cd /home/ec2-user/Foori/foori
pm2 restart foori-frontend || pm2 start npm --name "foori-frontend" -- start