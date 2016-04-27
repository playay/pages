---

layout: post_with_left
title: Spring @ResponseBody 注解导致 Accept-Charset 过长的问题
tags: other
keywords: [spring, accept-charset]

---

默认的 StringHttpMessageConverter 会加上 Accept-Charset 响应头并带上所有的字符集，这个选项可以在 spring-mvc 的配置中设置。

```xml
<bean id="stringHttpMessageConverter" class="org.springframework.http.converter.StringHttpMessageConverter">
    <constructor-arg value="UTF-8"/>
    <property name="writeAcceptCharset" value="false"/>
</bean>
```
