---

layout: post_with_left
title: 配置 https
tags: config
update: 2017-12-26 00:45
keywords: [ https, certbot ]

---

### certbot 官网

`https://certbot.eff.org/`


### 通配符域名
```sh
certbot certonly  --expand -d "feling.io,*.feling.io,feling.net,*.feling.net" --server https://acme-v02.api.letsencrypt.org/directory  --manual
```
只能手动 renew 