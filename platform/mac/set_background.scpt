#!/usr/bin/env osascript

tell application "System Events"
    set desktopCount to count of desktops
    repeat with desktopNumber from 1 to desktopCount
        tell desktop desktopNumber
            set picture to "/Users/mblazin/bing_wallpaper.jpg"
        end tell
    end repeat
end tell