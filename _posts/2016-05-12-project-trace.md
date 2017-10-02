---
layout: post_with_left
title: 我的链路跟踪系统
intro: 一个大型的系统, 往往由多个服务组成, 各个服务间存在着复杂的调用关系. 一个请求从打入系统到返回响应. 到底经过了哪些服务, 在每个服务中又经过了哪些代码, 每个阶段的响应时间如何. 这些都是一个链路跟踪系统该解决的问题. 它能帮助新加入项目的开发人员快速的了解系统间服务的关系, 发现系统性能瓶颈, 异常快速定位出问题的服务...
tags: project
keywords: [trace]
---
### 吧啦吧啦...
一个大型的 web 系统, 往往由多个服务组成, 各个服务间存在着复杂的调用关系. 一个请求从打入系统到返回响应. 到底经过了哪些服务, 在每个服务中又经过了哪些代码, 每个阶段的响应时间如何. 这些都是一个链路跟踪系统该解决的问题. 它能帮助新加入项目的开发人员快速的了解系统间服务的调用关系, 发现系统性能瓶颈, 异常时快速定位出问题的服务...

### 单服务内的跟踪

一个项目刚刚开发, 最开始的开发人员可能水平有限, 也可能是业务简单, 所有功能都在一个服务上确实符合项目刚开始情况. 

但就算是这样的一个服务, 也是需要链路跟踪的: 一个请求打到这个服务, 会经过一系列的代码, 这些代码在处理各自的逻辑的时候会打出相应的日志. 最差劲的, 你也应该在请求的开始和结束的时候,分别打出请求参数和返回结果吧. 在并发的情况下, 这一对对请求参数和返回结果并不是按顺序排列的, 是混合穿插的. (这只是单服务内对链路跟踪最紧急的一个需求)要怎么在这乱序的日志中 grep 出属于某个请求的日志, 我们可以给每个请求打出的日志加上特有的 id, 就叫它 traceId 吧. 

常见的 web 服务器都是一个请求对应一个线程(或其子线程)来处理吧, 至少我没有见到过其他方式的服务器, 就算是用协程的方式, 在更上层的抽象使用上看起来也是与线程一样的. 所以, 在 threadlocal 里记录这个 id, 应该是最容易想到的方式吧.

#### 日志打印
目前项目使用 slf4j + logback 打印日志

logback 的文档中看到 MDC(Mapped Diagnostic Context) 类, 提供静态的方法, 可以往 threadlocal 添加或删除键值对. 并在打印日志时, 通过 %X{key} 格式的pattern 打印出 MDC 类存放的 value. 

按这个类的介绍, 它本身就是为分布式的大型系统的链路跟踪而设计的. 所以非常符合我们的要求. 虽然是静态方法, 但每个线程拿到的 MDC 都是一份各自的 copy(*如何透明的做出这种封装, 值得深入学习*). 所以它本身线程安全.

#### 收到http请求时
在 web 项目的 filter 中, 每来一次 http 请求，就用 MDC 给这个线程设置一个新的 traceId, 就能很好的满足单服务架构下链路跟踪的要求.


#### 定时任务启动时
除了收到 http 请求（mq消息，dubbo调用也是一样）这种代码开始执行的入口，定时任务也是一个代码开始执行的入口。所以，不要忘了在定时任务的开头设置traceId

#### 线程间传递
在一次http请求（mq消息的消费等等也是一样）的处理过程中。可能需要多线程的处理。这时候就需要在线程间传递traceId。

```java
	final Map<String, String> mdcMap = MDC.getCopyOfContextMap();
	new Thread(() -> {
	    if (mdcMap != null) {
	        MDC.setContextMap(mdcMap);
	    }
	    logger.info("new thread start...");
	}).start();

```

#### by the way
暂时使用 UUID 做为 traceId 就 OK 了, 但是今后这个 traceId 应该是友好的、可读的、带有信息量的甚至进化成一个短小的数据包. 



### 多系统间链路跟踪 

#### HTTP 

在 header 里添加traceId并解析就好了：

```java
	@Override
	protected void doFilterInternal(HttpServletRequest request, 
									HttpServletResponse response, 
									FilterChain filterChain
									) throws ServletException, IOException {
	    MDC.put("traceId", request.getHeader("traceId") == null 
	    						? IdWorker.nextId("http") 
	    						: request.getHeader("traceId"));
	    response.addHeader("traceId", MDC.get("traceId"));
	    filterChain.doFilter(request, response);
	}

```

#### MQ

发送mq时，可以设置 header，接收方可以在 handleDeliver 方法中取出

#### dubbo

参考dubbo官方文档，在 dubbo 上下文对象中加入 traceId，在 filter 中解析

##### filter

##### 上下文

