'use strict';

function jobComplete() {}

jobComplete.prototype.intentHandlers = {
    "planDay_getSummary": function (intent, session, response) {
        //get text back and say same greeting
        //get summary data
        this.storeSessionInfo(session, 'getSummary');
        var speechOutput = "Hello Dino. You have 3 lead invitations, 1 unread message, 2 pending payments more than 7 days old. Would you like me to give you your leads, read your messages or send reminders for the outstanding payments?";
        var cardTitle = "Summary of your day";
        var cardContent = speechOutput;
        response.askWithCard(speechOutput, cardTitle, cardContent);
    }
};

module.exports = new jobComplete();