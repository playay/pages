---
layout: post
title: 安卓设备使用ubuntu PC的网络(通过USB)
pub_date: 2015-05-14
tag: 玩机
keywords:
    - 安卓
    - ubuntu
    - android
    - 网络共享
---

##再一次明确标题: 电脑有网络,通过USB接口,共享给没网的手机用

##底层的连接
手机通过USB连接电脑,并打开usb网络共享,就完成了底层的连接.(**电脑可能自动连接上这个usb接口,并自动使用这个接口的网络,但这个接口连到了手机上,共享的方向跟我们想要的是相反的,需要断开连接**)    
在电脑上执行`ifconfig`可以看到usb接口的信息.(假设没网的手机的usb接口名字叫usb1)    

##上层的共享

###电脑上的设置
0. 切换到root用户(接下来的步骤还是切换到root用户操作比较方便,虽然我一般不在root用户下操作,但在这里还是投降了...)    
1. 启用ipv4的转发`echo 1 > /proc/sys/net/ipv4/ip_forward`     
2. 假设电脑上有网络的接口是usb0,执行以下命令添加NAT:    
`iptables -t nat -A POSTROUTING -o usb0 -j MASQUERADE`    
3.给没网的手机的usb接口(假设接口名是usb1)分配ip地址:    
`ifconfig usb1 192.168.42.121 netmask 255.255.255.0 up`    

###手机上的设置
0. 可以通过adb shell控制设备(还是要在root用户下,因为部分手机启用usb网络共享后,普通用户没有adb权限)    
1. `su` 获取root权限
2. `busybox route add default gw 192.168.42.121`添加默认网关

