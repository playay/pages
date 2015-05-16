---
layout: post_with_left
title: 安卓设备通过USB使用ubuntu电脑的ipv4网络
pub_date: 2015-05-14
tag: 玩机
keywords:
    - 安卓
    - ubuntu
    - android
    - 网络共享
---

####再一次明确标题: 电脑有网络, 通过USB接口, 共享给没网的手机用


###一、底层的连接

手机通过USB连接电脑, 并打开usb网络共享, 就完成了底层的连接.    
**电脑可能自动连接上这个usb接口, 并自动使用这个接口的网络, 这时共享的方向跟我们想要的是相反的, 所以需要断开连接**    
在电脑上执行`ifconfig`可以看到usb接口的信息.    
    
假设: 没网的手机的usb接口名字叫usb1, 电脑通过wlan0接口上网     


###二、上层的共享

####电脑上的设置
1. 切换到root用户(接下来的步骤还是切换到root用户操作比较方便, 虽然我一般不在root用户下操作, 但在这里还是投降了...)    

2. 启用ipv4的转发:     
{% gist chenyanclyz/d93e891fafbd3dd27427 ipv4_forward.sh %}

3. 添加NAT项:    
{% gist chenyanclyz/d93e891fafbd3dd27427 nat_insert.sh %}

4. 给没网的手机的usb接口分配ip地址:    
{% gist chenyanclyz/d93e891fafbd3dd27427 set_ip.sh %}

另: 查看NAT表项:    
{% gist chenyanclyz/d93e891fafbd3dd27427 cat_nat.sh %}

####手机上的设置
1. 可以通过adb shell控制设备(还是要在root用户下, 因为部分手机启用usb网络共享后, 普通用户没有使用adb的权限)    
2. `su` 获取root权限
3. 添加默认网关(电脑上usb1的ip地址):    
{% gist chenyanclyz/d93e891fafbd3dd27427 android_add_default_gw.sh %}

###三、自动化脚本
按自己的系统环境修改一下变量，在root用户下运行:    
{% gist chenyanclyz/d93e891fafbd3dd27427 ubuntu_share_net_to_android_via_usb.sh %}

