
'use strict';

function jokes() {}

jokes.prototype.intentHandlers = {
    // register custom intent handlers
    "jokes_solveTyreKickers": function (intent, session, response) {
        //get text back and say same greeting
        //get summary data
        this.storeSessionInfo(session, 'solveTyreKickers');
        var speechOutput = "I have full confidence that the hi pages Product and Engineering team will solve it soon. <break time='.5s'/> After all... they built me.";
        var cardTitle = "Consider it done";
        var cardContent = "I have full confidence that the hipages Product and Engineering team will solve it soon.  After all, they built me.";
        response.tellWithCard(speechOutput, cardTitle, cardContent);
    }
};

module.exports = new jokes();