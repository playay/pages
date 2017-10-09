---

layout: post_with_left
title: chrome 调试安卓真机上的网页
tags: play
update: 2017-10-09 15:45
keywords: [ webview ]

---


### chrome 上打开 `chrome://inspect` 页面

### 连接手机, 授权 usb 调试

---

### 坑/进阶

#### 调试页面空白
打开调试页面，如果一直是空白的，可能是因为网络环境有问题。调试页面会去加载一个 js 文件，我是把 host 里包含 `chrome` 的请求，加到了代理列表里解决的


#### 设置微信

微信内的webview，也可以通过这种方式调试，但是需要一些设置：

1. 手机上打开网址 `http://debugx5.qq.com`
2. 信息  ->  TBS 设置  ->  打开 TBS 内核 Inspector 调试功能