---

layout: post_with_left_and_proxy_hint
title: raspbx 安装笔记
tags: play
keywords: [ raspbx, GSM 转 VOIP ]

---

### 终端里翻墙
```
export http_proxy=http://182.92.214.222:5088
```

### 开机自动连接 wifi 
+ 需要安装 wireless-tools 才能正常使用 usb 无线网卡
+ 编辑/etc/network/interface 文件
+ 重启networking 服务

```
auto wlan0
allow-hotplug wlan0
iface wlan0 inet dhcp
wpa-ssid "xxx"
wpa-psk "xxx"
```
