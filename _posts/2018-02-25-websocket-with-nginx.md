---

layout: post_with_left
title: nginx 下的 websocket 服务配置
tags: config
update: 2018-02-25 14:08
keywords: [websocket, nginx, wss]

---


### 先上配置

```
    location /ws2s-server/ {
        proxy_pass http://127.0.0.1:3613/;
        proxy_redirect off;

        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
```

### 再解释一下

为什么我想配置的是 websocket，但是配置的内容跟普通的 http 代理转发那么像，proxy_pass 项的值配置的是 websocket 服务的ip 和端口，但是却是 http 开头的呢？     

可以这么自我安慰的解释下： websocket 连接在建立的过程中，是依赖于 http 的。    
首先，客户端发出的是 http 请求，只不过带了一些特殊的 header。之后，一系列的操作处理完成，大家才开始完全换了一种语言，开始了 websocket 的交流。     

对于 wss 不需要任何额外的配置，原先 https 的配置，直接对 wss 生效。      