---
layout: post_with_left_and_proxy_hint
title: python 获取当前网速
intro: 通过统计`ifconfig`的输出信息，计算当前网速。这是一个几分钟就能完成的小程序。主要是为了提供一个获取网速的的思路。
tags: project
keywords: [开源项目, python3, 网速]
---
### 项目地址

---
http://git.oschina.net/chenyanclyz/curspeed


### 基本原理

---
在 Linux 上，可以用`ifconfig`命令查看到网络接口的信息，包括本次开机某个网络接口收发了多少字节的数据。    
    
注意是字节 byte，不是比特 bite。一个字节等于八个比特，体现在单位上：我们经常说的下载速度1.25MB/s，单位是B。而运营商却让我们付10Mb带宽的钱，单位是b。    
    
我们每隔一段时间，获取一次 `ifconfig` 命令的输出结果，得到收发总字节的差，就能算出当前的实时网速。    
    
我们使用 python 的 os.popen()执行 shell 命令，并得到命令的执行结果。用 re.sub()匹配出收发的总字节。    
    
    
### 代码示例
{% gist chenyanclyz/4330e6fb489edc382e28 %}

运行示例：    
系统语言是中文，每隔1秒统计一次 eth0 接口的上传速度    
`python curspeed.py eth0 tx cn 1`
