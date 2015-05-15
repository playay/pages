---
layout: post_with_left
title: ubuntu系统在校园网使用纯ipv6
pub_date: 2015-05-15
tag: 玩机
keywords:
    - 校园网
    - ubuntu
    - ipv6
    - 免登录
    - 免流量
    - 科学上网

---

###应用场景

1. 校园网登录客户端的linux版本太旧, 新系统上用不了
2. 校园网欠费, 或流量有限制
3. 某些网站在大陆无法访问(这个问题还可以通过[免费代理](/2015/05/14/proxy.html)解决)

由于以上问题都只出现的ipv4的网络中, 如果你有ipv6的网络环境, 可以禁用ipv4, 并设置ipv6的DNS服务器地址:    
这里有一个网上找的可用ipv6DNS服务器地址:

```
2001:778::37
```

###ubuntu上的详细设置,截图如下:    

![禁用ipv4](/images/ipv6_setting0.png)
![设置ipv6](/images/ipv6_setting1.png)




