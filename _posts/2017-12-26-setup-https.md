---

layout: post_with_left
title: 配置 https
tags: config
update: 2018-04-06 00:48
keywords: [ https, certbot ]

---

### certbot 官网

`https://certbot.eff.org/`


### 通配符域名
```sh
certbot certonly --manual \
--expand -d "feling.io,*.feling.io,feling.net,*.feling.net" \
--server https://acme-v02.api.letsencrypt.org/directory 
```

只能手动 renew 

### xxx

```
➜ bj ~ 

certbot certonly --manual \
--expand -d "feling.io,*.feling.io,feling.net,*.feling.net" \
--server https://acme-v02.api.letsencrypt.org/directory


cat /etc/letsencrypt/live/feling.io-0001/fullchain.pem

cat /etc/letsencrypt/live/feling.io-0001/privkey.pem

阿里云 cdn
```