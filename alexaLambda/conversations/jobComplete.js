'use strict';

var jobCompleteService = require('../services/jobComplete');

function JobComplete() {}

JobComplete.prototype.intentHandlers = {
    "jobComplete_markComplete": function (intent, session, response) {
        //get job data
        var username = intent.slots.username.value;
        this.storeDataInSession(session, 'jobComplete_markComplete', 'username', username);
        this.vars.speechOutput = "Job has been marked as completed. Would you like to request payment from Sam?";
        this.vars.cardTitle = "Job marked as complete";
        this.vars.cardContent = this.vars.speechOutput;
        this.storeIntentsWaitingResponseInSession(session, 'jobComplete_markComplete');
        this.askWithCard(response);
    },

    "jobComplete_markCompleteYes": function (intent, session, response) {
        console.log('in jobComplete_markCompleteYes');
        this.intentHandlers.jobComplete_sendPaymentRequest.call(this, intent, session, response);
    },

    "jobComplete_markCompleteNo": function (intent, session, response) {
        console.log('in jobComplete_markCompleteNo');
        this.removeIntentsWaitingResponseInSession(session);
        this.vars.speechOutput = "Ok";
        this.ask(response);
    },

    "jobComplete_markCompleteHelp": function (intent, session, response) {
        console.log('in jobComplete_markCompleteHelp');
        this.storeIntentsWaitingResponseInSession(session, 'jobComplete_sendPaymentRequest');
        this.vars.speechOutput = "Say the amount to send the payment request from Sam or no to cancel";
        this.vars.cardTitle = "Job Complete Help";
        this.vars.cardContent = this.vars.speechOutput;
        this.askWithCard(response);
    },

    "jobComplete_sendPaymentRequest": function (intent, session, response) {
        //get payment amount
        var paymentAmount = (intent.slots && intent.slots.paymentAmount) ? intent.slots.paymentAmount.value : '';

        //if no payment amount captured
        if (paymentAmount == '') {
            this.vars.speechOutput = "How much for?";
            this.vars.cardTitle = "How much?";
            this.vars.cardContent = "I need to know how much for your payment request";
            this.storeIntentsWaitingResponseInSession(session, 'jobComplete_sendPaymentRequest');
            this.askWithCard(response);
            return;
        }

        // users who give an amount with no context or the previous intent is yes but is not job marked complete
        if ((this.vars.waitingIntent != 'jobComplete_sendPaymentRequest') && (this.vars.waitingIntent != 'jobComplete_markComplete')) {
            this.vars.speechOutput = "What is that number for?";
            this.vars.cardTitle = "I'm lost";
            this.vars.cardContent = this.vars.speechOutput;
            this.askWithCard(response);
            return;
        }

        //store payment amount into session
        var username = this.getDataInSession(session, 'jobComplete_markComplete', 'username');
        this.storeDataInSession(session, 'jobComplete_sendPaymentRequest', 'paymentAmount', paymentAmount);
        this.vars.speechOutput = "Payment request of " + paymentAmount + " dollars is sent. I have also requested feedback from " + username + ".";
        this.vars.cardTitle = "Payment request sent";
        this.vars.cardContent = "Payment request of $" + paymentAmount + " is sent. I have also requested feedback from " + username + ".";
        this.removeIntentsWaitingResponseInSession(session);
        this.askWithCard(response);


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
    },

    "jobComplete_sendPaymentRequestYes": function (intent, session, response) {
        this.intentHandlers.jobComplete_sendPaymentRequest.call(this, intent, session, response);
    },

    "jobComplete_sendPaymentRequestNo": function (intent, session, response) {
        this.removeIntentsWaitingResponseInSession(session);
        this.vars.speechOutput = "Ok";
        this.ask(response);
    },

    "jobComplete_sendPaymentRequestHelp": function (intent, session, response) {
        this.vars.speechOutput = "Say the amount to send the payment request from Sam or no to cancel";
        this.vars.cardTitle = "Job Complete Help";
        this.vars.cardContent = this.vars.speechOutput;
        this.askWithCard(response);
    }

};

module.exports = new JobComplete();