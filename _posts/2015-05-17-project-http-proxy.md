---
layout: post_with_left_and_proxy_hint
title: python实现http代理
intro: 基于python的socket实现的http代理, 用到了多进程+协程来提高性能
tags: project
keywords: [开源项目, python, http代理, gevent, 协程, 惊群]
---


###前言
在开始讲解之前, 先扯几句, 讲给初学的孩子. 对于我们写代码的人, **官方文档**才是王道. 想要实现http代理, 肯定要了解一点http协议, 要了解http协议, 就要看协议的官方文档!!! 二手资料跟一手资料之间的差距, 就不多说了. 

####http协议的文档
关于网络协议的文档, 可以在这里查https://www.ietf.org/. 搜索文档编号就行. 目前关于http的文档有这几篇:    

`提示: 谷歌浏览器按住ctrl键再点击链接, 可以在后台标签中打开`

- https://tools.ietf.org/html/rfc7230    
- https://tools.ietf.org/html/rfc7231    
- https://tools.ietf.org/html/rfc7232    
- https://tools.ietf.org/html/rfc7233    
- https://tools.ietf.org/html/rfc7234    
- https://tools.ietf.org/html/rfc7235    

####项目git地址
这个项目目前托管在开源中国: http://git.oschina.net/chenyanclyz/httpproxy    
过段时间我应该会全面转到github上.    

####最原始的实现原理
实现一个http代理的功能, 最容易想到的程序的运行过程, 应该是这样的:    

1. 接收http请求    
2. 解析请求头, 得到host和uri    
3. 把http请求发到host去, 接收host的响应    
4. 把响应传回给请求方    


###实现最原始的功能
按照前言中提到的[最原始的实现原理](#最原始的实现原理), 我们来实现一下最原始的功能. 这里只以GET方法为例, 对其他的方法, 会在下一章[完善对协议的支持](#完善对协议的支持)中详细介绍. 这里也不考虑性能, 对于性能的改善, 会在[改善性能](#改善性能)这一章中介绍 

####创建工程

####接收请求

####解析请求

####得到响应并回传给请求方


###完善对协议的支持

####HEAD

####POST

####CONNECT

####常见状态码


###改善性能

####多进程

####协程




###未完待续...

