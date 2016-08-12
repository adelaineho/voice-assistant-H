'use strict';

function HowToBeAwesome() {}

HowToBeAwesome.prototype.intentHandlers = {
    "howToBeAwesome_moreLeads": function (intent, session, response) {
        //get job data
        this.vars.speechOutput = "Your rating on punctuality is 4.2 stars. Your peers are an average of 4.5. Improving this will help you win more work. You can set reminders and get traffic alerts from me to help with that.";
        this.vars.cardTitle = "How you can do better";
        this.vars.cardContent = this.vars.speechOutput;
        this.askWithCard(response);
    },

    "howToBeAwesome_priceBenchmark": function (intent, session, response) {
        //get job data
        this.storeIntentInSession(session, 'howToBeAwesome_priceBenchmark');
        this.vars.speechOutput = "Your value for money rating is 4.6. This is above average compared to your peers.";
        this.vars.cardTitle = "Your value for money rating";
        this.vars.cardContent = this.vars.speechOutput;
        this.askWithCard(response);
    }

};

module.exports = new HowToBeAwesome();