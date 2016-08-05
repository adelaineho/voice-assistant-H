'use strict';
var http = require('http');
var requestPost = require('../node_modules/request');

var baseUrl = 'http://fe6.stg.aws.viteknologies.com.au';

function response() {}

response.prototype.post = function (path, data, callback) {
    console.log('response post wrapper');
    var postData = {
      url: baseUrl + path,
      data: data
    };
    requestPost.post(postData, callback);
};

module.exports = new response();