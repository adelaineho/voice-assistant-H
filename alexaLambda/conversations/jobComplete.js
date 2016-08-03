'use strict';

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
        var username = this.getDataInSession(session, this.getLastIntentInSession(session), 'username');
        this.storeIntentInSession(session, 'jobComplete_sendPaymentRequest');
        var speechOutput = "Payment request sent. I have also requested feedback from " + username + ".";
        var cardTitle = "Payment request sent";
        var cardContent = speechOutput;
        response.askWithCard(speechOutput, cardTitle, cardContent);
    }
};

module.exports = new jobComplete();