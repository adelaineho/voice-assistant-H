
'use strict';

function planDay() {}

planDay.prototype.intentHandlers = {
    // register custom intent handlers
    "planDay_getSummary": function (intent, session, response) {
        //get text back and say same greeting
        //get summary data
        this.storeSessionInfo(session, 'planDay_getSummary');
        var speechOutput = "Hello Dino. You have 3 lead invitations, 1 unread message, 2 pending payments more than 7 days old. Would you like me to give you your leads, read your messages or send reminders for the outstanding payments?";
        var cardTitle = "Summary of your day";
        var cardContent = speechOutput;
        response.askWithCard(speechOutput, cardTitle, cardContent);
    },
    "planDay_readMessages": function (intent, session, response) {
        //get unread messages data
        this.storeSessionInfo(session, 'planDay_readMessages');
        var speechOutput = "Message from Sam about the Floor Sanding job in Newtown. <break time='1s' />Hi John. Still waiting on your quote for my floors. Thanks";
        var cardTitle = "Message from Sam";
        var cardContent = "About the Floor Sanding job in Newtown. Hi Dino. Still waiting on your quote for my floors. Thanks";
        response.askWithCard(speechOutput, cardTitle, cardContent);
    },
    "planDay_getPendingLeads": function (intent, session, response) {
        //get leads data
        this.storeSessionInfo(session, 'planDay_getPendingLeads');
        var speechOutput = "Plumber in Bondi or blocked drain in Summer Hill";
        var cardTitle = "Your pending leads";
        var cardContent = speechOutput;
        response.askWithCard(speechOutput, cardTitle, cardContent);
    },
    "planDay_pendingLeadsHelp": function (intent, session, response) {
        this.storeSessionInfo(session, 'planDay_pendingLeadsHelp');
        var speechOutput = "I'll let you know which leads you're more likely to win. I'll always give you the most recent leads which have not had 3 quotes yet.";
        var cardTitle = "Pending leads are...";
        var cardContent = speechOutput;
        response.tellWithCard(speechOutput, cardTitle, cardContent);
    },
    "planDay_sendPaymentReminders": function (intent, session, response) {
        //get who to send reminders
        this.storeSessionInfo(session, 'planDay_sendPaymentReminders');
        var speechOutput = "A friendly reminder has been sent to Mary in Waterloo and Adam in Surry Hills for the payments pending.";
        var cardTitle = "Payment reminders sent";
        var cardContent = speechOutput;
        response.askWithCard(speechOutput, cardTitle, cardContent);
    },
    "planDay_whichReminder": function (intent, session, response) {
        // checks whether this was part of the summary conversation
        if (session.attributes.intents.indexOf('planDay_getSummary') != -1) {
            this.intentHandlers.sendPaymentReminders.call(this, intent, session, response);
        } else {
            this.storeSessionInfo(session, 'planDay_whichReminder');
            var speechOutput = "Would you like to send outstanding payments reminders or follow up reminders?";
            var cardTitle = "Which reminder do you mean?";
            var cardContent = speechOutput;
            response.askWithCard(speechOutput, cardTitle, cardContent);
        }
    }
};

module.exports = new planDay();