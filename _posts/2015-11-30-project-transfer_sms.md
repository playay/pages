---
layout: post_with_left_and_proxy_hint
title: sl4a + python 自动转发短信
intro: 我有两个手机号。号码1只做收验证码用，因为使用太久了，绑定了各种帐号，又各种骚扰电话短信。号码2只有少数几个人知道。我希望出门就带着号码2，却又不能错过验证码短信。于是，我用 sl4a + python 写了个自动转发短信的小脚本。这样就可以少带一部烦人的手机出门啦，顺便还可以加点对骚扰短信的过滤。
tags: project
keywords: [开源项目, python, sl4a, 自动转发短信]
---
###项目背景

我有两个手机号。    

号码1现在只做收验证码用。因为它用了太久了，绑定了各种帐号，解绑好麻烦，又各种骚扰电话短信。     

号码2是新买的，轻易不告诉别人。     

我希望出门就带着号码2，却又不能错过验证码短信。   


###定方案

IOS 开发之前都没接触过，而且也没什么兴趣写运行在封闭的系统上的代码。    

Android 原生的开发也太庞大了。

如果能用小脚本实现，那是最好不过的了。翻了翻 [sl4a 的文档](http://www.mithril.com.au/android/doc/)，有获取未读短信的方法，有标记短信为已读的方法，虽然没有对接收新短信的事件的监听，但可以循环地检查嘛（好的，中心句已经出现，=.=本文到此结束）。至于骚扰短信的过滤，我翻了下各种烦人的通知类短信，发现它们都是挺客气的，不是“你好”就是“您”，要么就是“尊敬的”，当然还有开发票的“本公司”，还有四环内上门的“长期” <_< 。反正，带“验证码”或者“校验码”三个字的肯定是可以我要的。    


###环境
这是 [sl4a_r6.apk](/download/sl4a_r6.apk)，从 google code 搬到 github 上以后，安装包就不太好找了，居然找不到下载链接。

###上代码

```python

#coding:utf8
'''\
author: chenyan
自动转发短信
'''
import android
import time

droid = android.Android()
stop = False

def not_harass(sms_body):
    '''\
    判断骚扰短信
    '''
    if '验证码' in sms_body\
        or '校验码' in sms_body:
        return True
    if '您' in sms_body\
        or '你好' in sms_body\
        or '尊敬的' in sms_body\
        or '长期' in sms_body\
        or '本公司' in sms_body\
        or '退订' in sms_body:
        print '判断为骚扰短信，未转发：',sms_body,'\n'
        return False
    return True

def do_transfer():
    '''\
    获取未读短信，检查短信内容，转发，标记为已读
    '''
    global stop
    sms_id_list = droid.smsGetMessageIds(True).result
    for sms_id in sms_id_list:
        sms_body = droid.smsGetMessageById(sms_id)\
                   .result['body']\
                   .encode('utf8')
        if sms_body == 'stop':
            stop = True
            return
        if not_harass(sms_body):
            droid.smsSend('1××××××4201', sms_body)
    droid.smsMarkMessageRead(sms_id_list, True)

while not stop:
    do_transfer()
    time.sleep(1.5)
```

