---

layout: post_with_left
title: 海外接口代理
tags: config
update: 2018-11-15 22:54
keywords: [nginx proxy]

---

### 场景
接入 google 第三方登录时. 前端拿到用户信息后, 后端需要访问 google 的接口来验证信息的真实性. 但是因为某些原因, 这个接口是访问不了的.     

服务是部署在阿里云的函数计算上的, 只能运行在国内没跑了. 而且没办法在运行环境上动配置.       

刚好有台吃灰的海外主机.      

### 方案
1. 发起 http 请求的时候, 是能在代码层面设置代理的, 但是之前没写过, 查写法感觉麻烦. 而且还要搭一个代理服务器. 这个方案太重了. 
2. 在海外主机上用 nginx 搭代理, 只需要几行配置, 代码上也只需要改变 url, 非常轻量. 

最终选择了方案2.    

### nginx 配置
```
location ~ ^/+(.*?)/ {
    # proxy_pass 中要修改 host 的话, 必须指定DNS解析, `cat /etc/resolv.conf` 查看配置
    resolver        100.100.2.136      100.100.2.138; 

    # location 中使用正则的话, proxy_pass 里就无法指定uri了, 所以用 rewrite 来指定
    rewrite         ^/+(.*?)/(.*)      /$2            break;
    proxy_pass      https://$1; 
}
```

### 使用案例
见 [这份代码](https://github.com/playay/loginWithGoogle/blob/master/src/main/java/io/feling/loginwithgoogle/api/LoginWithGoogle.java) 的第39行     

访问 `https://proxy.feling.io/www.googleapis.com/oauth2/v3/tokeninfo?id_token=xxx` 的效果,     
等价于访问 `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=xxx`

### 资源共享
基本上, 你可以随意使用 `proxy.feling.io`. (反正也是吃灰的, 大家合理自用吧).    
上面的 nginx 配置就跟文中给出的一致.    
它是一台在新加坡的服务器, 单核 1G内存 1M带宽, 2020-06-07 到期(基本上我是会续费的).    





