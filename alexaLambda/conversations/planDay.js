
'use strict';

var planDayService = require('../services/planDay');

function planDay() {}

planDay.prototype.intentHandlers = {
    // register custom intent handlers
    "planDay_getSummary": function (intent, session, response) {
        //get tradie name and say same greeting
        //get summary data
        this.storeIntentInSession(session, 'planDay_getSummary');
        planDayService.getSummaryData(function(data) {
            if(data) {
                var leadsCount = data.leads;
                var unreadMessages = data.unread_message_count;
                var pendingPayments = data.pending_payments;
                var speechOutput = "You have " + leadsCount + " lead invitations, " + unreadMessages + " unread message, " + pendingPayments + " pending payments more than 7 days old. Would you like me to give you your leads, read your messages or send reminders for the outstanding payments?";
                var cardTitle = "Summary of your day";
                var cardContent = speechOutput;
            } else {
                var speechOutput = "You have 2 lead invitations, 2 unread message, 3 pending payments more than 7 days old. Would you like me to give you your leads, read your messages or send reminders for the outstanding payments?";
                var cardTitle = "Summary of your day";
                var cardContent = speechOutput;
            }
            response.askWithCard(speechOutput, cardTitle, cardContent);
        });


    },
    "planDay_readMessages": function (intent, session, response) {
        //get unread messages data and tradie name
        this.storeIntentInSession(session, 'planDay_readMessages');
        var speechOutput = "Message from Sam about the Floor Sanding job in Newtown. Hi Tom. Still waiting on your quote for my floors. Thanks";
        var cardTitle = "Message from Sam";
        var cardContent = "About the Floor Sanding job in Newtown. Hi Dino. Still waiting on your quote for my floors. Thanks";
        response.askWithCard(speechOutput, cardTitle, cardContent);
    },
    "planDay_getPendingLeads": function (intent, session, response) {
        //get leads data
        this.storeIntentInSession(session, 'planDay_getPendingLeads');
        var speechOutput = "Plumber in Bondi or blocked drain in Summer Hill";
        var cardTitle = "Your pending leads";
        var cardContent = speechOutput;
        response.askWithCard(speechOutput, cardTitle, cardContent);
    },
    "planDay_pendingLeadsHelp": function (intent, session, response) {
        this.storeIntentInSession(session, 'planDay_pendingLeadsHelp');
        var speechOutput = "I'll let you know which leads you're more likely to win. I'll always give you the most recent leads which have not had 3 quotes yet.";
        var cardTitle = "Pending leads are...";
        var cardContent = speechOutput;
        response.tellWithCard(speechOutput, cardTitle, cardContent);
    },
    "planDay_sendPaymentReminders": function (intent, session, response) {
        //get who to send reminders
        var lastIntent = this.getLastIntentInSession(session);
        if (lastIntent == 'planDay_getSummary') {
            this.storeIntentInSession(session, 'planDay_sendPaymentReminders');
            var speechOutput = "A friendly reminder has been sent to Mary in Waterloo and Adam in Surry Hills for the payments pending.";
            var cardTitle = "Payment reminders sent";
            var cardContent = speechOutput;
            response.askWithCard(speechOutput, cardTitle, cardContent);
        } else {
            this.intentHandlers.message_sendMessage.call(this, intent, session, response);
        }
    },
    "planDay_whichReminder": function (intent, session, response) {
        // checks whether this was part of the summary conversation
        var lastIntent = this.getLastIntentInSession(session);
        if (lastIntent == 'planDay_getSummary') {
            this.intentHandlers.planDay_sendPaymentReminders.call(this, intent, session, response);
        } else {
            this.storeIntentInSession(session, 'planDay_whichReminder');
            var speechOutput = "Would you like to send outstanding payments reminders or follow up reminders?";
            var cardTitle = "Which reminder do you mean?";
            var cardContent = speechOutput;
            response.askWithCard(speechOutput, cardTitle, cardContent);
        }
    }
};

module.exports = new planDay();