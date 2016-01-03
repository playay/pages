---
layout: post_with_left_and_proxy_hint
title: android通过USB使用ubuntu的ipv4网络
tags: other
keywords: [安卓, ubuntu, android, 网络共享]
---
再一次明确标题: 电脑有网络, 通过USB接口, 共享给没网的手机用


### 底层的连接

手机通过 USB 连接电脑, 并打开 usb 网络共享, 就完成了底层的连接.    
**电脑可能自动连接上这个 usb 接口, 并自动使用这个接口的网络, 这时共享的方向跟我们想要的是相反的, 所以需要断开连接**    
在电脑上执行 `ifconfig` 可以看到 usb 接口的信息.    
    
假设: 没网的手机的 usb 接口名字叫 usb1, 电脑通过 wlan0 接口上网     


###  上层的共享

### 电脑上的设置
1. 切换到 root 用户(接下来的步骤还是切换到 root 用户操作比较方便, 虽然我一般不在 root 用户下操作, 但在这里还是投降了...)    

2. 启用 ipv4 的转发:     
{% gist chenyanclyz/4e99e4888681a5e329c9 ipv4_forward.sh %}

3. 添加 NAT 项:    
{% gist chenyanclyz/4e99e4888681a5e329c9 nat_insert.sh %}

4. 给没网的手机的usb接口分配 ip 地址:    
{% gist chenyanclyz/4e99e4888681a5e329c9 set_ip.sh %}

另: 查看NAT表项:    
{% gist chenyanclyz/4e99e4888681a5e329c9 cat_nat.sh %}

#### 手机上的设置
1. 可以通过 adb shell 控制设备(还是要在 root 用户下, 因为部分手机启用 usb 网络共享后, 普通用户没有使用 adb 的权限)    
2. `su` 获取 root 权限
3. 添加默认网关(电脑上 usb1 的 ip 地址):    
{% gist chenyanclyz/4e99e4888681a5e329c9 android_add_default_gw.sh %}


###自动化脚本
按自己的系统环境修改一下变量，在 root 用户下运行:    
{% gist chenyanclyz/4e99e4888681a5e329c9 ubuntu_share_net_to_android_via_usb.sh %}

