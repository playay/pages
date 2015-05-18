---
layout: post_with_left_and_proxy_hint
title: python实现http代理
intro: 基于python的socket实现的http代理, 用到了多进程+协程来提高性能
tags: project
keywords: [开源项目, python3, http代理, gevent, 协程, 惊群]
---


###前言
在开始讲解之前, 先扯几句, 讲给初学的孩子. 对于我们写代码的人, **官方文档**才是王道. 想要实现http代理, 肯定要了解一点http协议, 要了解http协议, 就要看协议的官方文档!!! 二手资料跟一手资料之间的差距, 就不多说了.    

####http协议的文档
关于网络协议的文档, 可以在这里查https://www.ietf.org/. 搜索文档编号就行. 目前关于http的文档有这几篇:    

```
提示: 谷歌浏览器按住ctrl键再点击链接, 可以在后台标签中打开
```

- https://tools.ietf.org/html/rfc7230    
- https://tools.ietf.org/html/rfc7231    
- https://tools.ietf.org/html/rfc7232    
- https://tools.ietf.org/html/rfc7233    
- https://tools.ietf.org/html/rfc7234    
- https://tools.ietf.org/html/rfc7235    

####项目git地址
这个项目目前托管在github上: https://github.com/chenyanclyz/http_proxy    

####最原始的实现原理
实现一个http代理的功能, 最容易想到的程序的运行过程, 应该是这样的:    

1. 接收http请求    
2. 解析请求头, 得到host和uri    
3. 把http请求发到host去, 接收host的响应    
4. 把响应传回给请求方    


###实现最原始的功能
按照前言中提到的[最原始的实现原理](#最原始的实现原理), 我们来实现一下最原始的功能. 这里只以GET方法为例, 对其他的方法, 会在下一章[完善对协议的支持](#完善对协议的支持)中详细介绍. 这里也不考虑性能, 对于性能的改善, 会在[改善性能](#改善性能)这一章中介绍.    

####创建工程
一般来说, 一个目录就是一个工程, 这个目录下通常会有以下几个文件夹:    

- bin/ 可执行文件    
- lib/ 所有的第三方库    
- src/ 程序的源码    
- doc/ 项目文档    

我们写的是python代码, 就不需要src文件夹了, 可执行文件就是源码, 所以建个`http_proxy/bin/` 文件夹, 工程就算创建好了......哈哈哈, 就这样...太扯了...至少还得新建个`http_proxy.py`文件吧.    

####接收、解析、处理请求
我们用socket接收http请求. 首先, 写出一个socket程序的模板:    
绑定、监听、启动新线程处理请求    
{% gist chenyanclyz/5f2127c5d4ec675489a1 _socket.py %}

如上所示, 我们做到了: 来一个请求, 就启动一个线程. 在新的线程里, 用proxyer()接收请求.    

---

有一个很重要的问题: **如何完整地接收请求**. 数据在用socket传输的过程中, 可能分多次传送, 具体原理可以参考ip或tcp报文的分段传输, 因为单个数据包的大小有限制. 如果数据大小超过这个限制就要分多次发送, 调用一次`soc.recv(4096)`, 就不能保证完整接收请求了, 另外如果单个数据包大小超过4096, `soc.recv(4096)`也收不到完整数据.    

http协议中, 有两种方式判断数据是否接收完整:    

1. 如果请求头中包含`Content-Length`,就用它来判断    
2. 如果请求头中包含`Transfer-Encoding`, 就用它来判断    

如果两种都不包含, 默认用第二种方式, 如果两种都包含, 用第二种方式.    
`Transfer-Encoding`在完整协议里有很多个可选值, 这里只当它是chunked(实际上网时, 我只见过这一种). 它表示: 最后会发一个空的socket包来标记数据发送完毕.    

---

所以, 我们循环调用`soc.recv(4096)`, 接收完请求头, 就解析一下, 才能判断是否接收完请求. 解析的时候, 顺便把其他信息也都解析出来.    

---

对于http请求, 还有最后一步, 按照协议规定: 浏览器发给代理的请求头, 与正常的请求头是不一样的, 所以我们还要对请求头做一些修改, 才能转给目的主机.    


完善proxyer()方法如下:    
{% gist chenyanclyz/5f2127c5d4ec675489a1 handle_request.py %}

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

