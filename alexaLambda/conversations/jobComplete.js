'use strict';

var jobCompleteService = require('../services/jobComplete');

function jobComplete() {}

jobComplete.prototype.intentHandlers = {
    "jobComplete_markComplete": function (intent, session, response) {
        //get job data
        var username = intent.slots.username.value;
        this.storeIntentInSession(session, 'jobComplete_markComplete');
        this.storeDataInSession(session, 'jobComplete_markComplete', 'username', username);
        var speechOutput = "Job has been marked as completed. Would you like to request payment from " + username + "?";
        var cardTitle = "Job marked as complete";
        var cardContent = speechOutput;
        response.askWithCard(speechOutput, cardTitle, cardContent);
    },
    "jobComplete_sendPaymentRequest": function (intent, session, response) {
        //get payment amount
        var paymentAmount = intent.slots.paymentAmount.value || '';
        var secondLastIntent = this.getLastIntentInSession(session, -2);
        var lastIntent = this.getLastIntentInSession(session);
        //if no payment amount captured
        if (paymentAmount == '') {
            var speechOutput = "How much for?";
            var cardTitle = "How much?";
            var cardContent = "I need to know how much for your payment request";
            response.askWithCard(speechOutput, cardTitle, cardContent);
            return;
        }
        // users who give an amount with no context or the previous intent is yes but is not job marked complete
        if ((lastIntent != 'jobComplete_markComplete') || (lastIntent == 'AMAZON.YesIntent' && secondLastIntent != 'jobComplete_markComplete')) {
            var speechOutput = "What is that number for?";
            var cardTitle = "I'm lost";
            var cardContent = speechOutput;
            response.askWithCard(speechOutput, cardTitle, cardContent);
            return;
        }
        this.storeIntentInSession(session, 'jobComplete_sendPaymentRequest');
        //store payment amount into session
        this.storeDataInSession(session, 'jobComplete_sendPaymentRequest', 'paymentAmount', paymentAmount);
        var username = this.getDataInSession(session, this.getLastIntentInSession(session), 'username');
        var speechOutput = "Payment request of " + paymentAmount + " dollars is sent. I have also requested feedback from " + username + ".";
        var cardTitle = "Payment request sent";
        var cardContent = "Payment request of $" + paymentAmount + " is sent. I have also requested feedback from " + username + ".";
        response.askWithCard(speechOutput, cardTitle, cardContent);
//        jobCompleteService.paymentRequest(paymentAmount, function(error, res) {
//            if(res) {
//                var username = this.getDataInSession(session, this.getLastIntentInSession(session), 'username');
//                var speechOutput = "Payment request of " + paymentAmount + " dollars is sent. I have also requested feedback from " + username + ".";
//                var cardTitle = "Payment request sent";
//                var cardContent = "Payment request of $" + paymentAmount + " is sent. I have also requested feedback from " + username + ".";
//                response.askWithCard(speechOutput, cardTitle, cardContent);
//            } else {
//                var username = this.getDataInSession(session, this.getLastIntentInSession(session), 'username');
//                var speechOutput = "Payment request of " + paymentAmount + " dollars is sent. I have also requested feedback from " + username + ".";
//                var cardTitle = "Payment request sent";
//                var cardContent = "Payment request of $" + paymentAmount + " is sent. I have also requested feedback from " + username + ".";
//                response.askWithCard(speechOutput, cardTitle, cardContent);
//            }
//        });
    }
};

module.exports = new jobComplete();