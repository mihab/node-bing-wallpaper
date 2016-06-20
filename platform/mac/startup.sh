#!/bin/bash

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" # This loads nvm

rm -fv /Users/mblazin/scripts/startup.log
node /Users/mblazin/Dev/node-bing-wallpaper/index.js >> /Users/mblazin/scripts/startup.log 2>&1

osascript /Users/mblazin/scripts/set_background.scpt >> /Users/mblazin/scripts/startup.log 2>&1
