---

layout: post_with_left
title: 我的 zsh 配置
tags: config
update: 2017-10-06 15:45
keywords: [ zsh ]

---
### zshrc

```sh
plugins=(git autojump extract encode64 urltools zsh-syntax-highlighting go)
```


```sh
eval $(thefuck --alias kao)
```

```sh
alias vi='vi -p'
alias mkdir='mkdir -pv'
alias scp='date && scp'
alias dk='docker'
export GOPATH=$HOME/go
```


### theme 

```sh
~/.oh-my-zsh/themes/robbyrussell.zsh-theme 
```

```sh
local ret_status="%(?:%{$fg_bold[green]%}➜ :%{$fg_bold[red]%}➜ )"
PROMPT='${ret_status}%m %{$fg[cyan]%}%c%{$reset_color%} $(git_prompt_info)'

ZSH_THEME_GIT_PROMPT_PREFIX="%{$fg_bold[blue]%}git:(%{$fg[red]%}"
ZSH_THEME_GIT_PROMPT_SUFFIX="%{$reset_color%} "
ZSH_THEME_GIT_PROMPT_DIRTY="%{$fg[blue]%}) %{$fg[yellow]%}✗"
ZSH_THEME_GIT_PROMPT_CLEAN="%{$fg[blue]%})"
```