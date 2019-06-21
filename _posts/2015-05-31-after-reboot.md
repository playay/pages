---
layout: post_with_left
title: 重启之后的几个screen
tags: play
keywords: []
---

### 0

#### shadow

```
sslocal -c ssconf.json
```

#### ssh

```
ssh -gD 2088 -gqfnNC proxy.feling.net // 不用screen也行
ssh -D 2088 -gqfnNC fqer@us.feling.net
```

#### http

```
ssh -gqfnNCL 4088:us.feling.net:9999 fqer@us.feling.net
```




### 1

#### xvfb

```
Xvfb :1 -ac -screen 1 1024x768x8
```

#### httpd4t

```
~/httpd4t_2$ python httpd4t.py 8888
```

#### http_proxy

```
~/http_proxy/bin$ python http_proxy.py 9999
```


