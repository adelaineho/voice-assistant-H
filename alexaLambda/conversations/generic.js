
'use strict';

function generic() {}

generic.prototype.intentHandlers = {
    // register custom intent handlers
    "generic_greeting": function (intent, session, response) {
        //get text back and say same greeting
        this.storeIntentInSession(session, 'generic_greeting');
        var speechOutput = "Hi Tom, how can I help?";
        var cardTitle = "Hello Tom";
        var cardContent = "How can I help?";
        response.tellWithCard(speechOutput, cardTitle, cardContent);
    }
};

module.exports = new generic();