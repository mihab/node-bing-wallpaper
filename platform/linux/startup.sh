#!/bin/bash

export NVM_DIR="/home/miha/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"  # This loads nvm

rm -fv /home/miha/scripts/startup.log
node /home/miha/Dev/workspace/node-bing-wallpaper/index.js >> /home/miha/scripts/startup.log 2>&1
