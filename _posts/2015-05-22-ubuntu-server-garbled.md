---
layout: post_with_left
title: ubuntu server 中文乱码
tags: play
keywords: [ubuntu, 中文乱码]
---

###问题

---

阿里云的主机， 默认装的Ubuntu server 12.04系统中文乱码


###解决方案

---

更改时区...

不需要改成中国的时区, en_US照样可以正常支持中文, 只要编码是utf8就行了.    


使用`locale`命名查看当前配置

---
Ubuntu 官网上说, 有两个文件用来配置时区:    

```
/etc/default/locale
/etc/environment
```

实际用的时候, 其中一台机器只改了`/etc/default/locale`就可以了.    

但是另一台怎么改都无效. 感觉像是根本没运行配置文件. 实在没办法, 在`/etc/profile`里面export了配置. 

附上配置的内容:   

```
LANG=en_US.UTF-8
LANGUAGE=en_US:en
LC_CTYPE="en_US.UTF-8"
LC_NUMERIC="en_US.UTF-8"
LC_TIME="en_US.UTF-8"
LC_COLLATE="en_US.UTF-8"
LC_MONETARY="en_US.UTF-8"
LC_MESSAGES="en_US.UTF-8"
LC_PAPER="en_US.UTF-8"
LC_NAME="en_US.UTF-8"
LC_ADDRESS="en_US.UTF-8"
LC_TELEPHONE="en_US.UTF-8"
LC_MEASUREMENT="en_US.UTF-8"
LC_IDENTIFICATION="en_US.UTF-8"
LC_ALL=en_US.UTF-8

```

