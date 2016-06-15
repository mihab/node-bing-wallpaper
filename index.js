#!/usr/bin/env node

'use strict';

const request = require('request');
const parseString = require('xml2js').parseString;
const fs = require('fs');

function downloadImage(url) {
    const fileName = process.env.HOME + '/' + 'bing_wallpaper.jpg'
    console.log('Downloading: ' + url + " to " + fileName);
    request(url).on('error', (err) => {
        console.log(err);
    }).pipe(fs.createWriteStream(fileName));
    console.log('Successfully downloaded image!')
}

function parseXML(rawString) {
    parseString(rawString, (err, result) => {
        if (!err) {
            downloadImage(result.rss.channel[0].item[0].enclosure[0].$.url);
        } else {
            console.log(err)
        }
    });
}

function start() {
    request('http://feeds.feedburner.com/bingimages', (error, response, body) => {
        if (!error && response.statusCode === 200) {
            parseXML(body);
        } else {
            console.log(error);
        }
    });
}

// Wait for wifi to connect
setTimeout(start, 30000);