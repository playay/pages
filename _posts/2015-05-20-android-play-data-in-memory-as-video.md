---
layout: post_with_left_and_proxy_hint
title: 安卓播放内存中的视频数据
tags: play
keywords: [安卓, 视频播放, 底层接口, 内存中的视频数据]
---

###需求

---

通过网络获取了视频文件的一小块, 需要直接播放出来. 

###麻烦

---

安卓的MediaPlayer之类的上层接口, 只接受文件路径或者网络url作为输入. 翻了好久API Guides, 谷歌百度了好多次. 到处都在讲这些上层接口. 

###解决方案

---

今天终于发现了**MediaCodec**这个底层接口. 

###试用体验

---

未完待续...
