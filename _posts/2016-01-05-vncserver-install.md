---

layout: post_with_left
title: vncserver 安装笔记
tags: install
keywords: [ vnc ]

---

### 安装
```sh
apt-get install vnc4server
```

### 修改启动配置
可能需要先 `vncserver` 启动一下, 才能自动生成下面要修改的文件    
vi ~/.vnc/xstartup    
注释掉 `x-window-manager &` 添加 `gnome-session &`


### 安装桌面
```sh
apt-get install x-window-system-core
apt-get install gdm
apt-get install ubuntu-desktop
```

### 启动
```sh
vncserver
```

### 关闭
```sh
vncserver -kill :1
```

### 开机自启动
vi /etc/rc.local    

```sh
su root -c '/usr/bin/vncserver -name my-vnc-server -depth 16 -geometry 1366x728 :1'
```

### 修改密码
```sh
vncpasswd
```