---
layout: post_with_left
title: ssh远程登录-对每个用户单独配置
tags: play
keywords: [ssh]
---

###背景

---
阿里云的云盾显示我异地登录了, 但是不知道登录的用户名啊! 我在上面配置了一个专门用来做ssh代理的用户组, 密码是公开的. 于是想要禁止root用户登录, 禁止其他用户使用密码登录, 但是要允许ssh代理的用户使用密码登录.     



###解决方案

---
用`Match`    

编辑配置文件`/etc/ssh/sshd_config`    

先给所有用户设置:    

```python
PermitRootLogin no
UsePAM no
PasswordAuthentication no

```

然后在配置文件结尾用Match给特定用户组设置: (这里只给出目前自己的配置, Match的其他用法用到时再搜)    
fq是希望能使用密码登录的用户组     


```python
Match Group fq
    PasswordAuthentication yes

```

