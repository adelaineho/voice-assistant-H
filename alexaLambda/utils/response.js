'use strict';

var requestPost = require('request');

var baseUrl = 'http://fe6.stg.aws.viteknologies.com.au';

function ResponseHttp() {}

ResponseHttp.prototype.post = function (path, data, callback) {
    console.log('response post wrapper');
    var postData = {
        url: baseUrl + path,
        form: data,
        headers: [
            {
                name: 'content-type',
                value: 'application/json'
            }
        ]
    };
    requestPost.post(postData, callback);
};

module.exports = new ResponseHttp();