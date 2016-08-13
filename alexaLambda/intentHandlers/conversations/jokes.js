'use strict';

module.exports = {
    // register custom intent handlers
    "jokes_solveTyreKickers": function (intent, session, response) {
        var possibleSpeechAnswers = [
            'I have full confidence that the hi pages product and engineering team will solve it soon. After all... they built me.',
            "I heard that the team at hi pages are hosting an innovation hackathon, maybe they have already solved it as we speak"
        ];
        var possibleContentAnswers = [
            "I have full confidence that the hipages Product and Engineering team will solve it soon.  After all, they built me.",
            "I heard that the team at hipages are hosting an innovation hackathon, maybe they've already solved it as we speak?"
        ];
        var takeOne = Math.floor(Math.random() * possibleSpeechAnswers.length);
        this.vars.speechOutput = possibleSpeechAnswers[takeOne];
        this.vars.cardContent = possibleContentAnswers[takeOne];
        this.vars.cardTitle = "Consider it done";
        this.askWithCard(response);
    }
};
