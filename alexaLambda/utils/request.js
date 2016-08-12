'use strict';

var http = require('http');

var baseUrl = 'http://fe6.stg.aws.viteknologies.com.au';

function RequestHttp() {}

RequestHttp.prototype.getUrl = function (path, callback) {
    var responseData = '';
    http.get(baseUrl + path, function (res) {
        console.log('Status Code: ' + res.statusCode);
        if (res.statusCode != 200) {
            callback(new Error("Non 200 Response"));
        }

        res.on('data', function (data) {
            responseData += data;
        });

        res.on('end', function () {
            try {
                var responseDataObject = JSON.parse(responseData);
            } catch(e) {
                console.log(e);
                var responseDataObject = { error : { message : 'JSON error. Can not parse response'} };
            }
            if (responseDataObject.error) {
                console.log("error: " + responseDataObject.error.message);
                callback(new Error(responseDataObject.error.message));
            } else {
                console.log(responseDataObject);
                callback(null, responseDataObject);
            }
        });
    }).on('error', function (e) {
        console.log("Communications error: " + e.message);
        callback(new Error(e.message));
    });
};

module.exports = new RequestHttp();