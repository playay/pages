---

layout: post_with_left_and_proxy_hint
title: mysql 默认字符集
tags: config
keywords: [mysql]

---


在 /etc/mysql/my.cnf 里


[mysqld]下面添加

```
character-set-server=utf8
collation-server=utf8_general_ci
skip-character-set-client-handshake
```
