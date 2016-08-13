'use strict';

var planDayService = require('../../services/planDay');

module.exports = {
    /**
     * Get the day's summary data for the connected tradie
     * Puts the intent in the "intentsWaitingResponse" which means it requires a Yes, No and Help intents
     * to be define to manage this possible answers
     *
     * @param intent
     * @param session
     * @param response
     */
    "planDay_getSummary": function (intent, session, response) {
        //get tradie name and say same greeting
        //get summary data
        var that = this;
        planDayService.getSummaryData(function(data) {
            if(data) {
                var leadsCount = data.leads;
                var unreadMessages = data.unread_message_count;
                var pendingPayments = data.pending_payments;
                that.vars.speechOutput = "You have " + leadsCount + " lead invitations, " + unreadMessages + " unread message, " + pendingPayments + " pending payments more than 7 days old. Would you like me to give you your leads, read your messages or send reminders for the outstanding payments?";
                that.vars.cardTitle = "Summary of your day";
                that.vars.cardContent = that.vars.speechOutput;
            } else {
                that.vars.speechOutput = "You have 2 lead invitations, 2 unread message, 3 pending payments more than 7 days old. Would you like me to give you your leads, read your messages or send reminders for the outstanding payments?";
                that.vars.cardTitle = "Summary of your day";
                that.vars.cardContent = that.vars.speechOutput;
            }
            that.storeIntentsWaitingResponseInSession(session, 'planDay_getSummary');
            that.askWithCard(response);
        });
    },

    "planDay_getSummaryYes": function (intent, session, response) {
        this.intentHandlers.planDay_getSummaryHelp.call(this, intent, session, response)
    },

    "planDay_getSummaryNo": function (intent, session, response) {
        this.removeIntentsWaitingResponseInSession(session);
        this.vars.speechOutput = "Ok. Let me know when you're ready";
        this.tell(response);
    },

    "planDay_getSummaryHelp": function (intent, session, response) {
        this.vars.speechOutput = "Would you like me to give you your leads, read your messages or send reminders for the outstanding payments?";
        this.vars.cardTitle = "Please be more specific";
        this.vars.cardContent = this.vars.speechOutput;
        this.askWithCard(response);
    },


    "planDay_readMessages": function (intent, session, response) {
        //get unread messages data and tradie name
        this.vars.speechOutput = "Message from Sam about the Floor Sanding job in Newtown. Hi Tom. Still waiting on your quote for my floors. Thanks";
        this.vars.cardTitle = "Message from Sam";
        this.vars.cardContent = "About the Floor Sanding job in Newtown. Hi Dino. Still waiting on your quote for my floors. Thanks";
        this.askWithCard(response);
    },

    "planDay_getPendingLeads": function (intent, session, response) {
        //get leads data
        this.vars.speechOutput = "Plumber in Bondi or blocked drain in Summer Hill";
        this.vars.cardTitle = "Your pending leads";
        this.vars.cardContent = this.vars.speechOutput;
        this.askWithCard(response);
    },

    "planDay_pendingLeadsHelp": function (intent, session, response) {
        this.vars.speechOutput = "I'll let you know which leads you're more likely to win. I'll always give you the most recent leads which have not had 3 quotes yet.";
        this.vars.cardTitle = "Pending leads are...";
        this.vars.cardContent = this.vars.speechOutput;
        this.tellWithCard(response);
    },

    "planDay_sendPaymentReminders": function (intent, session, response) {
        //get who to send reminders
        if (this.vars.waitingIntent == 'planDay_getSummary') {
            this.vars.speechOutput = "A friendly reminder has been sent to Mary in Waterloo and Adam in Surry Hills for the payments pending.";
            this.vars.cardTitle = "Payment reminders sent";
            this.vars.cardContent = this.vars.speechOutput;
            this.askWithCard(response);
        } else {
            this.intentHandlers.message_sendMessage.call(this, intent, session, response);
        }
    },

    "planDay_whichReminder": function (intent, session, response) {
        // checks whether this was part of the summary conversation
        if (this.vars.waitingIntent == 'planDay_getSummary') {
            this.intentHandlers.planDay_sendPaymentReminders.call(this, intent, session, response);
        } else {
            this.vars.speechOutput = "Would you like to send outstanding payments reminders or follow up reminders?";
            this.vars.cardTitle = "Which reminder do you mean?";
            this.vars.cardContent = this.vars.speechOutput;
            this.askWithCard(response);
        }
    }
};
