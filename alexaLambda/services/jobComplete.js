'use strict';

var getter = require('../utils/request');
var setter = require('../utils/response');

function JobCompleteService() {}

JobCompleteService.prototype.sendMessage = function (messageBody, callback) {
    console.log('sendMessage called');
    var data = { message: messageBody };
    setter.post('/message_sendmessage', data, function (error, res) {
        console.log('setter post called');
        console.log(data);
        if(error) {
            console.log(error);
            callback(null);
        }
        console.log(res);
        var httpResponse = res ? res.response : null;
        callback(httpResponse);
    });
};

JobCompleteService.prototype.paymentRequest = function (amount, callback) {
    console.log('paymentRequest called');
    var data = { amount: amount };
    setter.post('/jobcomplete_sendpaymentrequest', data, function (error, res) {
        if(error) {
            console.log(error);
            callback(null);
        }
        console.log(res);
        var httpResponse = res ? res.response : null;
        callback(httpResponse);
    });
};

module.exports = new JobCompleteService();
