'use strict';

function howToBeAwesome() {}

howToBeAwesome.prototype.intentHandlers = {
    "howToBeAwesome_moreLeads": function (intent, session, response) {
        //get job data
        this.storeIntentInSession(session, 'howToBeAwesome_moreLeads');
        var speechOutput = "Your rating on punctuality is 4.2 stars. Your peers are an average of 4.5. Improving this will help you win more work. You can set reminders and get traffic alerts from me to help with that.";
        var cardTitle = "How you can do better";
        var cardContent = speechOutput;
        response.askWithCard(speechOutput, cardTitle, cardContent);
    },
    "howToBeAwesome_priceBenchmark": function (intent, session, response) {
        //get job data
        this.storeIntentInSession(session, 'howToBeAwesome_priceBenchmark');
        var speechOutput = "Your value for money rating is 4.6. This is above average compared to your peers.";
        var cardTitle = "Your value for money rating";
        var cardContent = speechOutput;
        response.askWithCard(speechOutput, cardTitle, cardContent);
    }

};

module.exports = new howToBeAwesome();