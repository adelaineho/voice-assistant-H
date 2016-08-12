'use strict';

function Generic() {}

Generic.prototype.intentHandlers = {
    // register custom intent handlers
    "generic_greeting": function (intent, session, response) {
        //get text back and say same greeting
        this.vars.speechOutput = "Hi Tom, how can I help?";
        this.vars.cardTitle = "Hello Tom";
        this.vars.cardContent = "How can I help?";
        this.askWithCard(response);
    },

    "generic_getAmount": function (intent, session, response) {
        var intentHandler = this.intentHandlers[this.vars.waitingIntent];
        if (intentHandler) {
            intentHandler.call(this, intent, session, response);
        } else {
            this.vars.speechOutput = "What is that number for?";
            this.vars.cardTitle = "I'm lost";
            this.vars.cardContent = this.vars.speechOutput;
            this.askWithCard(response);
        }
    },

    "AMAZON.YesIntent": function (intent, session, response) {
        var intentHandler = this.intentHandlers[this.vars.waitingIntent];
        if (intentHandler) {
            var intentHandlerYes = this.intentHandlers[this.vars.waitingIntent + 'Yes'];
            if (intentHandlerYes) {
                intentHandlerYes.call(this, intent, session, response);
            } else {
                intentHandler.call(this, intent, session, response);
            }
        } else {
            this.vars.speechOutput = "How I can help?";
            this.vars.cardTitle = "Hello!";
            this.vars.cardContent = this.vars.speechOutput;
            this.askWithCard(response);
        }
    },

    "AMAZON.NoIntent": function (intent, session, response) {
        var intentHandler = this.intentHandlers[this.vars.waitingIntent];
        if (intentHandler) {
            var intentHandlerNo = this.intentHandlers[this.vars.waitingIntent + 'No'];
            if (intentHandlerNo) {
                intentHandlerNo.call(this, intent, session, response);
            } else {
                intentHandler.call(this, intent, session, response);
            }
        } else {
            this.vars.speechOutput = "Not sure what you're referring to";
            this.vars.cardTitle = "I'm lost";
            this.vars.cardContent = "Can you be more specific?";
            this.askWithCard(response);
        }
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        var intentHandler = this.intentHandlers[this.vars.waitingIntent + 'Help'];
        if (intentHandler) {
            intentHandler.call(this, intent, session, response);
        } else {
            this.vars.speechOutput = "I can help you with getting an update on hi pages, checking your account balance, completing jobs and advice on how to improve.";
            this.vars.cardTitle = "How I can help?";
            this.vars.cardContent = this.vars.speechOutput;
            this.askWithCard(response);
        }
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var intentHandler = this.intentHandlers[this.vars.waitingIntent + 'Cancel'];
        if (intentHandler) {
            intentHandler.call(this, intent, session, response);
        } else {
            this.vars.speechOutput = "Have a nice day. Let's get a beer together one time";
            this.vars.cardTitle = "Got it!";
            this.vars.cardContent = "Have a nice day. Let's get a beer together one time!";
            this.tellWithCard(response);
        }
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var intentHandler = this.intentHandlers[this.vars.waitingIntent + 'Cancel'];
        if (intentHandler) {
            intentHandler.call(this, intent, session, response);
        } else {
            this.vars.speechOutput = "Calm down";
            this.vars.cardTitle = "Ok bye!";
            this.vars.cardContent = "(Calm down...)";
            this.tellWithCard(response);
        }
    }
};

module.exports = new Generic();