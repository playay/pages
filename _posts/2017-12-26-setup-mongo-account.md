---

layout: post_with_left
title: 给开发人员配置 mongodb 账号
tags: config
update: 2017-12-26 00:45
keywords: [ mongodb, account ]

---

### 说明
这篇文章纯属胡扯。。。正经配置方法, 请参考官方文档

### 没有密码
刚装好的数据库默认不需要账号密码

### 新建连接
```sh
docker exec -it mongo0 mongo admin
```

### 新建 dba 用户
要想给开发人员分配账号密码。首先，要创建一个 dba 用户。像这样: 

1. 切换到 admin 这个 db 下
2. 创建一个 dba 用户

```js
use admin

db.createUser(
   {
     user: "dba",
     pwd: "woshiyigedba",
     roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
   }
)
```

### 新建普通用户
然后用 dba 用户来操作, 创建给开发人员用的数据库、账号密码。
像这样: 

1. 创建数据库 `shujukumingzi`
2. 在这个数据库下，创建账号密码 `yonghuming/mima`

```js
use admin
db.auth("dba", "woshiyigedba")

use shujukumingzi

db.createUser(
   {
     user: "yonghuming",
     pwd: "mima",
     roles: [ { role: "readWrite", db: "shujukumingzi" } ]
   }
)
```


### 删除用户
```js
db.dropUser('yonghuming')
```

