---
layout: post_with_left_and_proxy_hint
title: python 实现 http 代理
intro: 基于 python 的 socket 实现的 http 代理, 用到了多进程+协程来提高性能. 
tags: project
keywords: [开源项目, python, http代理, gevent, 协程, 惊群]
---


###前言

---

这篇文章将会介绍一个 http 代理的实现过程...

#### http 协议的文档
关于网络协议的文档, 可以在这里查 https://www.ietf.org/ . 搜索文档编号就行. 目前关于http的文档有这几篇:    


- https://tools.ietf.org/html/rfc7230    
- https://tools.ietf.org/html/rfc7231    
- https://tools.ietf.org/html/rfc7232    
- https://tools.ietf.org/html/rfc7233    
- https://tools.ietf.org/html/rfc7234    
- https://tools.ietf.org/html/rfc7235    


#### 项目 git 地址
这个项目目前托管在 github 上: https://github.com/chenyanclyz/http_proxy    
另外, 实际的程序部署在了阿里云的美国主机上, 欢迎帮忙试验它的性能和稳定性. 具体IP地址和端口号见[免费代理](/2015/05/proxy.html#http代理)    

#### 最原始的实现原理
实现一个 http 代理的功能, 最容易想到的程序的运行过程, 可能是这样的:    

1. 接收 http 请求    
2. 解析请求头, 得到 host 和 uri    
3. 转发请求, 接收响应    
4. 把响应传回给请求方    



### 实现基本的功能

---

按照前言中提到的[最原始的实现原理](#最原始的实现原理), 我们来一步步实现.    
这里不考虑性能, 对于性能的改善, 会在[改善性能](#改善性能)这一章中介绍.    


#### 创建工程
一般来说, 一个目录就是一个工程, 这个目录下通常会有以下几个文件夹:    

- bin/ 可执行文件    
- lib/ 所有的第三方库    
- src/ 程序的源码    
- doc/ 项目文档    

我们写的是 python 代码, 就不需要 src 文件夹了, 可执行文件就是源码, 所以建个 `http_proxy/bin/` 文件夹, 新建个 `http_proxy.py` 文件,这个工程就算创建好了.    


#### 接收、解析、处理请求
我们用 socket 接收 http 请求. 首先, 写出一个 socket 程序的模板:    
绑定、监听、启动新线程处理请求    
{% gist chenyanclyz/5f2127c5d4ec675489a1 _socket.py %}

如上所示, 我们做到了: 来一个请求, 就启动一个线程. 在新的线程里, 用 `proxyer()` 接收请求并打印了出来.    

---

这里有一个很重要的问题: **如何完整地接收请求**.    
数据在用 socket 传输的过程中, 可能分多次传送, 具体原理可以参考 ip 或 tcp 报文的分段传输. 因为单个数据包的大小有限制, 如果数据大小超过这个限制就要分多次发送, 调用一次 `soc.recv(4096)`, 就不能保证完整接收请求了, 另外如果单个数据包大小超过4096, `soc.recv(4096)` 也收不到完整数据. 所以, 我们需要循环调用 `soc.recv(4096)` .   

什么时候结束循环呢? 用 socket 接收 http 请求的数据, 最开始收到的肯定是请求头, 请求头以 `\r\n\r\n` 结束.    
如果是 GET、HEAD、CONNECT 方法的请求，接收完请求头就表示已经完整接收请求.    
所以对于 GET、HEAD、CONNECT 方法可以这样做:    
{% gist chenyanclyz/5f2127c5d4ec675489a1 recv_request0.py %}

但如果是 POST 方法, 在请求头接收完之后可能还有数据. http 协议在中, 有两种方式判断 POST 请求是否接收完整:    

1. 如果请求头中包含 `Content-Length` ,就用它来判断    
2. 如果请求头中包含 `Transfer-Encoding` , 就用它来判断    

如果两种都不包含, 默认用第二种方式, 如果两种都包含, 用第二种方式.    
`Transfer-Encoding` 在完整协议里有很多个可选值, 这里只当它是 chunked (实际上网时, 我只见过这一种). 它表示: 最后会发一个空的 socket 包来标记数据发送完毕.    
实际中我也只见过第一种方式的 POST 请求. 不管怎样, 解析请求头是必须的, 解析的代码如下:    
{% gist chenyanclyz/5f2127c5d4ec675489a1 parse_request.py %}

有了解析请求头的方法, 就能在接收请求的时候, 加上对 POST 方法的支持:    
{% gist chenyanclyz/5f2127c5d4ec675489a1 recv_request1.py %}

---

对于 http 请求, 还有最后一步, 按照协议规定: 浏览器发给代理的请求头, 与正常的请求头是不一样的, 所以我们还要对请求头做一些修改, 才能转给目的主机.    
修改请求头的代码如下:    
{% gist chenyanclyz/5f2127c5d4ec675489a1 modify_request.py %}


修改完了请求头, 就该用它去获取响应了, 但是 CONNECT 方法的请求比较特殊, 如果是 CONNECT 方法, 接下来要做的不是获取响应, 而是建立一条到目标主机的隧道. 所以我们准备好两个方法 `do_proxy()` 和 `do_tunnel()` . 下一节中我们会分别实现这两个方法.    
{% gist chenyanclyz/5f2127c5d4ec675489a1 end_proxyer.py %}


#### 得到响应并回传给请求方
上一节中, 我们接收完了 http 请求, 并解析、处理了它. 算是完成了[最原始的实现原理](#最原始的实现原理)中的1、2两步. 最后留下了两个方法 `do_proxy()` 和 `do_tunnel()` . 实现这两个方法, 就算是完成了剩下的3、4两步.    

先说下相对简短的 `do_tunnel()` . 要实现的是: 建立一条请求方到目标主机的隧道. 其实只要新建一个 socket 连到目标主机上, 然后把请求方的 socket 拿过来、对接上就OK了. 对接, 就是把一个 socket 收到的数据, 发给另一个 socket . 看代码:    
{% gist chenyanclyz/5f2127c5d4ec675489a1 dock_socket.py %}

因为我们只做短连接, 所以如果数据方向是响应方发给请求方的, 就可以 close 掉 socket 了. 这就是 `recv_from_response` 的含义    
基于 `dock_socket()` 方法, `do_tunnel()` 的实现如下:    
{% gist chenyanclyz/5f2127c5d4ec675489a1 do_tunnel.py %}

```
其实, 第13、14行是我瞎写的. 没经过测试. 因为我当时直接用的gevent写这段代码. 在`改善性能`这章中会写到.    
```
隧道建立成功, 按照 http 协议要求, 要给请求方一个响应, 即第12行的 `soc.send(TUNNEL_OK)` .    
至此, 对 CONNECT 方法的 http 请求, 已经可以完整处理. 通过这个程序代理, 已经可以正常访问 `https://www.baidu.com` .    

---

接下来我们说 `do_proxy()` 方法, 要实现的功能就是:    

- 连接目标主机
- 发送请求
- 接收响应
- 转发请求

除了接收响应需要像接收请求时一样, 要注意如何完整接收报文之外. 并没有什么麻烦的地方.    

既然是像接收请求一样就收响应, 还是要先解析响应报文头:    
{% gist chenyanclyz/5f2127c5d4ec675489a1 parse_response.py %}

然后完成 `do_proxy()` 方法:    
{% gist chenyanclyz/5f2127c5d4ec675489a1 do_proxy.py %}

其实, 去掉各种 try, 还有对响应完整性的判断, 上面这段代码也就剩下:    

```
c = socket.socket()
c.connect((host, port))
buf = c.recv(4096)
soc.send(buf)

```

###改善性能

---

####协程

现在的程序还是多线程的模型，虽然功能已经实现。但是至少我自己在用的时候，明显感觉网速很慢。尤其是像腾讯、新浪这种门户网站的首页。一个页面的请求太他妈多了！！一下子就开了巨多的线程。线程相互之间切换的代价也是很大的，每个线程时间没做多少事，多数时间都在等待 IO。带宽没利用上多少，cpu 就快耗尽了，还都是耗在切换线程上，然后网速还很慢。   

有一种叫协程的东西。内部好象是用 select e叉叉 叉叉叉 那三个实现的。具体实现还没花时间研究过。它的效果大概是这样的：在一个线程里，有多个 socket，当一个 socket 在等待 IO 的时候，切换到其他的程序语句去执行。这个时候的切换，就相当于是函数调用的时候的切换，代价非常非常的小。用一个线程就能处理巨多的 socket ，充分利用 cpu 。    

实际用起来的效果，在代理运行在本地的时候，浏览器设置了代理，几乎感觉不到代理的存在。内存、cpu 等资源都占用得很少。部署到服务器上，带宽都耗尽了 cpu 资源都还剩余很多。    

我用的 gevent 这个第三方模块来实现协程，这个模块好像一直还没支持 python3 。反正我是一直没找到它的 python3 版本。    

时隔好久才来续写这篇文章，有点不想介绍 gevent 的使用了。这些可以直接看官方的文档。下面直接贴上代码，用 gevent 改写了两个地方。第一个是程序入口处：   

{% gist chenyanclyz/5f2127c5d4ec675489a1 gevent0.py %}

还有一个是 `do_tunnel()` 方法：    

{% gist chenyanclyz/5f2127c5d4ec675489a1 gevent1.py %}

在不考虑底层实现的情况下，可以把协程当成线程来用，他们提供的使用方式都是相近的。

####多进程
在一台多核 CPU 的电脑上, 与 CPU 核心数相同的进程数多数情况下能带来较大的性能.    
我们稍微修改一下程序的入口. 在为这个程序配置了监听的端口号之后, fork 出与 CPU 核心数相同个数的进程, 然后开始监听.   
{% gist chenyanclyz/5f2127c5d4ec675489a1 multi_process.py %}

这样很容易想到一个问题, 当一个请求来的时候, 这几个进程都会接收这个请求并处理? 其实这叫做`惊群现象`, 网上有资料说: 在系统的内核层面会处理这个问题, 内核会负责分配这些请求到各个进程. 程序实际运行过程中, 来的每个请求确实也只被分配到一个进程中处理.    



