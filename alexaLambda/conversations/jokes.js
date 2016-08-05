
'use strict';

function jokes() {}

jokes.prototype.intentHandlers = {
    // register custom intent handlers
    "jokes_solveTyreKickers": function (intent, session, response) {
        //get text back and say same greeting
        //get summary data
        this.storeIntentInSession(session, 'jokes_solveTyreKickers');
        var possibleSpeechAnswers = [
            'I have full confidence that the hi pages product and engineering team will solve it soon. After all... they built me.',
            "I heard that the team at hi pages are hosting an innovation hackathon, maybe they have already solved it as we speak"
        ];
        var possibleContentAnswers = [
            "I have full confidence that the hipages Product and Engineering team will solve it soon.  After all, they built me.",
            "I heard that the team at hipages are hosting an innovation hackathon, maybe they've already solved it as we speak?"
        ];
        var speechAnswer = possibleSpeechAnswers[Math.floor(Math.random() * possibleSpeechAnswers.length)];
        var contentAnswer = possibleContentAnswers[Math.floor(Math.random() * possibleContentAnswers.length)];

        var speechOutput = speechAnswer;
        var cardTitle = "Consider it done";
        var cardContent = contentAnswer;
        response.tellWithCard(speechOutput, cardTitle, cardContent);
    }
};

module.exports = new jokes();