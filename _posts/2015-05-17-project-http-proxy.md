---
layout: post_with_left_and_proxy_hint
title: python实现http代理
intro: 基于python的socket实现的http代理, 用到了多进程+协程来提高性能
tags: project
keywords: [开源项目, python3, http代理, gevent, 协程, 惊群]
---



###前言

---

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



###实现基本的功能

---

按照前言中提到的[最原始的实现原理](#最原始的实现原理), 我们来细化完善最原始的原理, 并实现一下基本的功能.    
这里不考虑性能, 对于性能的改善, 会在[改善性能](#改善性能)这一章中介绍.    


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

如上所示, 我们做到了: 来一个请求, 就启动一个线程. 在新的线程里, 用`proxyer()`接收请求.    

---

有一个很重要的问题: **如何完整地接收请求**.    
数据在用socket传输的过程中, 可能分多次传送, 具体原理可以参考ip或tcp报文的分段传输. 因为单个数据包的大小有限制, 如果数据大小超过这个限制就要分多次发送, 调用一次`soc.recv(4096)`, 就不能保证完整接收请求了, 另外如果单个数据包大小超过4096, `soc.recv(4096)`也收不到完整数据. 所以, 我们需要循环调用`soc.recv(4096)`.   

用socket接收http请求的数据, 最开始收到的肯定是请求头, 请求头以`\r\n\r\n`结束.    
如果是GET、HEAD、CONNECT方法的请求， 接收完请求头就表示已经完整接收请求.    
所以可以这样做:    
{% gist chenyanclyz/5f2127c5d4ec675489a1 recv_request0.py %}

但如果是POST方法, 在请求头接收完之后可能还有数据. http协议在中, 有两种方式判断POST请求是否接收完整:    

1. 如果请求头中包含`Content-Length`,就用它来判断    
2. 如果请求头中包含`Transfer-Encoding`, 就用它来判断    

如果两种都不包含, 默认用第二种方式, 如果两种都包含, 用第二种方式.    
`Transfer-Encoding`在完整协议里有很多个可选值, 这里只当它是chunked(实际上网时, 我只见过这一种). 它表示: 最后会发一个空的socket包来标记数据发送完毕.    
实际中我也只见过第一种方式的POST请求. 不管怎样, 解析请求头是必须的, 解析的代码如下:    
{% gist chenyanclyz/5f2127c5d4ec675489a1 parse_request.py %}

有了解析请求头的方法, 就能在接收请求的时候, 加上对POST方法的支持:    
{% gist chenyanclyz/5f2127c5d4ec675489a1 recv_request1.py %}

---

对于http请求, 还有最后一步, 按照协议规定: 浏览器发给代理的请求头, 与正常的请求头是不一样的, 所以我们还要对请求头做一些修改, 才能转给目的主机.    
修改请求头的代码如下:    
{% gist chenyanclyz/5f2127c5d4ec675489a1 modify_request.py %}


修改完了请求头, 就该用它去获取响应了, 但是CONNECT方法的请求比较特殊, 如果是CONNECT方法, 接下来要做的不是获取请求, 而是建立一条到目标主机的隧道. 所以我们准备好两个方法`do_proxy()`和`do_tunnel()`. 下一节中我们会分别实现这两个方法.    
{% gist chenyanclyz/5f2127c5d4ec675489a1 end_proxyer.py %}


####得到响应并回传给请求方



###改善性能

---



####协程
####多进程






###未完待续...

