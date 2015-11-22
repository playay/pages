---
layout: post_with_left_and_proxy_hint
title: 自己动手写web框架
intro: 一开始只是为了能快速配置出'访问一个网址,得到一个字符串'的web API;后来不断完善,慢慢积累出了自己的web框架——支持python2和3.
tags: project
keywords: [开源项目, python, httpd4t, web框架, gevent, 协程]
---


###前言

---
我自己对web框架的理解, 其实最核心的部分是做三件事:    

1. 把网址映射到一个方法或函数中去.    
2. 在这个函数中可以拿到访问这个网址时带的参数.    
3. 在这个函数里可以给这次网络请求返回响应.    

之后还有很多的...模版, 数据库等等都是附带的内容.    


###项目地址

---
http://git.oschina.net/chenyanclyz/httpd4t    

这个web框架目前部署在阿里云的美国主机上, 本站的文章阅读次数统计的功能就是用这个框架写的.    


###创建工程


###网址与函数的映射


###拿到请求中的参数


###return返回响应


###未完待7月份毕业有时间了续...