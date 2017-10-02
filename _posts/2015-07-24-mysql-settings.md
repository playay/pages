---

layout: post_with_left
title: mysql 默认字符集
tags: config
date: 2017-10-02 13:16:00
keywords: [mysql]

---

### 服务端配置

在 /etc/mysql/my.cnf 里


[mysqld]下面添加

```
character-set-server=utf8
collation-server=utf8_general_ci
skip-character-set-client-handshake
```

---

### 客户端配置

其实，无所谓服务端的字符集默认配置是什么样的。
与 mysql 服务器建立连接的时候, 在 "JDBC url" 或者 "命令行参数" 中指定本连接使用的字符集的方案会更加实用。

#### JDBC url 方式配置

```
?characterEncoding=UTF-8
```

#### 命令行方式配置

```
mysql --default-character-set=utf8
```