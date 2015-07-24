---
layout: post_with_left
title: mysql默认字符集
tags: play
keywords: [mysql]
---


在/etc/mysql/my.cnf里


[mysqld]下面添加

```
character-set-server=utf8
collation-server=utf8_general_ci
skip-character-set-client-handshake
```
