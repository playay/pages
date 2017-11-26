---

layout: post_with_left
title: supervisor 安装笔记
tags: install
keywords: [ supervisor ]

---

### 安装
```sh
apt install supervisor
```

### 路径
```sh
/etc/supervisor/
```

### 命令
```sh
service supervisor restart
supervisorctl help
```


### 配置
```sh
[program:example]
command=/bin/echo   ; 命令执行文件用绝对路径, 少踩坑
user=
```