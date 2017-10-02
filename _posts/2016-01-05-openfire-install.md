---

layout: post _with_left
title: openfire 安装笔记
tags: install
keywords: [ openfire ]

---

### 官网
http://www.igniterealtime.org/downloads/index.jsp#openfire

### 需要 java 环境
```sh
apt-get install openjdk-7-jre
```

### 关于 tar.gz
解压就能用 `tar -zxvf xxx.tar.gz`

### 关于 deb
安装 `dpkg -i xxx.deb`    
卸载 `dpkg -P openfire`   

安装后的路径: `/ur/share/openfire`    
不知道可执行文件在哪, 我用的压缩包中的可执行文件运行的.   

### web 管理端口
`9090`

### 数据库 bug
bug: 使用内置数据库, 安装后登录, 提示密码错误.    
fix: 使用外置数据库    

### 中文乱码
fix: 外置数据库使用 utf-8 编码 [mysql 配置](/2015/07/mysql-settings.html)
