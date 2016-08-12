'use strict';

var getter = require('../utils/request');
var setter = require('../utils/response');

function PlanDayService() {}

PlanDayService.prototype.getSummaryData = function(callback) {
    console.log('getSummaryData called');
    getter.getUrl('/planday_getsummary', function (error, res) {
        console.log('getUrl called');
        if(error) {
            console.log(error);
            callback(null);
        }
        console.log('res available');
        console.log(res);
        var httpResponse = res ? res.response : null;
        callback(httpResponse);
    });
};

module.exports = new PlanDayService();
