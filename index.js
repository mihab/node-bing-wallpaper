#!/usr/bin/env node

'use strict';

const request = require('request');

function start() {
    request('http://feeds.feedburner.com/bingimages', (error, response, body) => {
        if (!error && response.statusCode === 200) {
            console.log(body)
        } else {
            console.log(error);
        }
    });
}

// Wait for wifi to connect
setTimeout(start, 1);