---

layout: post_with_left
title: osx bash 配置
tags: config
keywords: [ bash, osx ]

---
### bash_profile

```
[[ -s ~/.bashrc ]] && source ~/.bashrc
```

### bashrc

```
[[ -s ~/.bash_completion_git ]] && source ~/.bash_completion_git

alias ls='ls -G'
alias ll='ls -lG'
alias la='ls -aG'
alias lla='ls -laG'

alias vi='vi -p'
```

### bash_completion\_git

https://github.com/git/git/tree/master/contrib/completion
