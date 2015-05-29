---
layout: post_with_left_and_proxy_hint
title: python获取当前网速
intro: 通过统计`ifconfig`的输出信息，计算当前网速。这是一个几分钟就能完成的小程序。主要是提供一个获取网速的的思路。
tags: project
keywords: [开源项目, python3, 网速]
---
###项目地址

---
http://git.oschina.net/chenyanclyz/curspeed


###原理

---
在Linux上，可以用`ifconfig`命令查看到网络接口的信息，包括本次开机某个网络接口收发了多少字节的数据。    
注意是字节byte，不是比特bite。一个字节等于八个比特，体现在单位上：我们经常说的下载速度1.25MB/s，单位是B。而运营商却让我们付10Mb带宽的钱，单位是b。    
我们每隔一段时间，获取一次`ifconfig`命令的输出结果，得到收发总字节的差，就能算出当前的实时网速。    

    

我们使用python的os.popen()执行shell命令，并得到命令的执行结果。用re.sub()匹配出收发的总字节。    
    
    

###代码

---    
{% gist chenyanclyz/4330e6fb489edc382e28 %}

运行示例：    
（系统语言是中文，每隔1秒统计一次eth0接口的上传速度）    
`python curspeed.py eth0 tx cn 1`
