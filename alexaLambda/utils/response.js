'use strict';
var http = require('http');

var baseUrl = 'http://fe6.stg.aws.viteknologies.com.au';
function response() {}

response.prototype.getUrl = function (path, callback) {
    var responseData = '';
    http.get(baseUrl + path, function (res) {
        console.log('Status Code: ' + res.statusCode);
//        context.succeed();
        if (res.statusCode != 200) {
            callback(new Error("Non 200 Response"));
        }

        res.on('data', function (data) {
            responseData += data;
        });

        res.on('end', function () {
            var responseDataObject = JSON.parse(responseData);

            if (responseDataObject.error) {
                console.log("error: " + responseDataObject.error.message);
                callback(new Error(responseDataObject.error.message));
            } else {
                callback(null, responseDataObject);
            }
        });
    }).on('error', function (e) {
        console.log("Communications error: " + e.message);
        callback(new Error(e.message));
    });
};

//response.prototype.postUrl = function (path, callback) {
//    http.(baseUrl + path, function(res) {
//        console.log("Got response: " + res.statusCode);
//        context.succeed();
//    }).on('error', function(e) {
//        console.log("Got error: " + e.message);
//        context.done(null, 'FAILURE');
//    });
//    console.log('end request to http://fe6.stg.aws.viteknologies.com.au');
//};

module.exports = new response();