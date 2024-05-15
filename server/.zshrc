
# >>> conda initialize >>>
# !! Contents within this block are managed by 'conda init' !!
__conda_setup="$('/Users/shashanktiwari/anaconda3/bin/conda' 'shell.zsh' 'hook' 2> /dev/null)"
if [ $? -eq 0 ]; then
    eval "$__conda_setup"
else
    if [ -f "/Users/shashanktiwari/anaconda3/etc/profile.d/conda.sh" ]; then
        . "/Users/shashanktiwari/anaconda3/etc/profile.d/conda.sh"
    else
        export PATH="/Users/shashanktiwari/anaconda3/bin:$PATH"
    fi
fi
unset __conda_setup
# <<< conda initialize <<<

export PATH="/opt/homebrew/opt/qt@5/bin:$PATH"

bindkey "^[[A" history-beginning-search-backward
bindkey "^[[B" history-beginning-search-forward

# Generated for envman. Do not edit.
[ -s "$HOME/.config/envman/load.sh" ] && source "$HOME/.config/envman/load.sh"
eval source <(/usr/local/bin/starship init zsh --print-full-init)
autoload -Uz compinit && compinit

if [ -f /opt/homebrew/bin/brew ]; then
        # auto-detect if homebrew is installed to /opt/homebrew
        eval $(/opt/homebrew/bin/brew shellenv)
        export CPPFLAGS="-I$(brew --prefix)/include${CPPFLAGS+ ${CPPFLAGS}}"
        export LDFLAGS="-L$(brew --prefix)/lib -Wl,-rpath,$(brew --prefix)/lib${LDFLAGS+ ${LDFLAGS}}"
        export LIBRARY_PATH="$LIBRARY_PATH:$(brew --prefix)/lib"
    fi
export PATH="/opt/homebrew/opt/node@16/bin:$PATH"

[ -f ~/.fzf.zsh ] && source ~/.fzf.zsh

export NVM_DIR="$HOME/.nvm"
  [ -s "/opt/homebrew/opt/nvm/nvm.sh" ] && \. "/opt/homebrew/opt/nvm/nvm.sh"  # This loads nvm
  [ -s "/opt/homebrew/opt/nvm/etc/bash_completion.d/nvm" ] && \. "/opt/homebrew/opt/nvm/etc/bash_completion.d/nvm"  # This loads nvm bash_completion
export PATH="/opt/homebrew/opt/jpeg/bin:$PATH"
export PATH="/opt/homebrew/bin/python3:$PATH"
