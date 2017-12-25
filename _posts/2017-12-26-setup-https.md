---

layout: post_with_left
title: 配置 https
tags: config
update: 2017-12-26 00:45
keywords: [ https, certbot ]

---

### certbot 官网

`https://certbot.eff.org/`


### 添加域名
目前还不支持通配符, 需要一个一个加。 新加 域名时, 用 -d 参数把新的、旧的域名都写上

```sh
certbot --expand -d feling.io,www.feling.io,feling.net,www.feling.net,pages.feling.net,api.feling.io
```



### 证书有效期
配置个定时任务。下面这个命令会先判断证书有效期，快过期了才会实际去执行更新证书的操作

```sh
0 0 * * * certbot renew > /root/certbot.log
```
