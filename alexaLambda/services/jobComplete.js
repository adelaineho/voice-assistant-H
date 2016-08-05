'use strict';

var getter = require('../utils/request');
var setter = require('../utils/response');

function jobComplete() {}

jobComplete.prototype.sendMessage = function (messageBody, callback) {
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
        callback(res);
    });
};

jobComplete.prototype.paymentRequest = function (amount, callback) {
    console.log('paymentRequest called');
    var data = { amount: amount };
    setter.post('/jobcomplete_sendpaymentrequest', data, function (error, res) {
        if(error) {
            console.log(error);
            callback(null);
        }
        console.log(res);
        callback(res.response);
    });
};

module.exports = new jobComplete();
