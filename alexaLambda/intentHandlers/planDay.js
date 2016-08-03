
'use strict';

function planDay() {}

planDay.prototype.intentHandlers = {
    // register custom intent handlers
    "planDay_getSummary": function (intent, session, response) {
        //get text back and say same greeting
        //get summary data
        this.storeSessionInfo(session, 'getSummary');
        var speechOutput = "Hello Dino. You have 2 pending leads with no claims and 3 outstanding payments. Would you like me to give you leads or send reminders for the outstanding payments?";
        var cardTitle = "Summary of your day";
        var cardContent = speechOutput;
        response.askWithCard(speechOutput, cardTitle, cardContent);
    },
    "planDay_getPendingLeads": function (intent, session, response) {
        //get leads data
        this.storeSessionInfo(session, 'getPendingLeads');
        var speechOutput = "Plumber in Bondi or blocked drain in Summer Hill";
        var cardTitle = "Your pending leads";
        var cardContent = speechOutput;
        response.tellWithCard(speechOutput, cardTitle, cardContent);
    },
    "planDay_pendingLeadsHelp": function (intent, session, response) {
        this.storeSessionInfo(session, 'pendingLeadsHelp');
        var speechOutput = "I'll let you know which leads you're more likely to win. I'll always give you the most recent leads which have not had 3 quotes yet.";
        var cardTitle = "Your pending leads";
        var cardContent = speechOutput;
        response.tellWithCard(speechOutput, cardTitle, cardContent);
    },
    "planDay_sendPaymentReminders": function (intent, session, response) {
        //get who to send reminders
        this.storeSessionInfo(session, 'sendPaymentReminders');
        var speechOutput = "A friendly reminder has been sent to Mary in Waterloo and Adam in Surry Hills for the payments pending.";
        var cardTitle = "Sending payment reminders...";
        var cardContent = speechOutput;
        response.tellWithCard(speechOutput, cardTitle, cardContent);
    },
    "planDay_whichReminder": function (intent, session, response) {
        // checks whether this was part of the summary conversation
        if (session.attributes.intents.indexOf('getSummary') != -1) {
            this.intentHandlers.sendPaymentReminders.call(this, intent, session, response);
        } else {
            this.storeSessionInfo(session, 'whichReminder');
            var speechOutput = "Would you like to send outstanding payments reminders or follow up reminders?";
            var cardTitle = "Which reminder do you mean?";
            var cardContent = speechOutput;
            response.askWithCard(speechOutput, cardTitle, cardContent);
        }
    }
};

module.exports = new planDay();