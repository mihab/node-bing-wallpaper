#!/usr/bin/env node

'use strict';

const request = require('request');
const parseString = require('xml2js').parseString;
const fs = require('fs');

function saveImageToDisk(url) {
    return new Promise((resolve, reject) => {
        const fileName = process.env.HOME + '/' + 'bing_wallpaper.jpg';
        console.log('Downloading: ' + url + " to " + fileName);
        request(url).on('error', (err) => {
            reject(err);
        }).pipe(fs.createWriteStream(fileName).on('finish', () => {
            console.log('Successfully downloaded image!');
            resolve(true);
        }));
    });
}

function retrieveImageUrl(rawString) {
    return new Promise((resolve, reject) => {
        parseString(rawString, (err, result) => {
            if (!err) {
                resolve(result.rss.channel[0].item[0].enclosure[0].$.url);
            } else {
                reject(err);
            }
        });
    });
}

function retrieveRawString() {
    return new Promise((resolve, reject) => {
        request('http://feeds.feedburner.com/bingimages', (error, response, body) => {
            if (error) {
                reject(error);
            }
            else if (response.statusCode !== 200) {
                reject(Error('Server responded with status code: ' + response.statusCode));
            } else {
                resolve(body);
            }
        });
    });
}

function start() {
    retrieveRawString().then(rawString => retrieveImageUrl(rawString)).then(url => saveImageToDisk(url));
}

// Wait for wifi to connect
setTimeout(start, 30000);

process.on('unhandledRejection', (reason) => {
    console.log('Failure: ' + reason);
});