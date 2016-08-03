'use strict';

function jobComplete() {}

jobComplete.prototype.intentHandlers = {
    "jobComplete_markComplete": function (intent, session, response) {
        //get job data
        this.storeSessionInfo(session, 'jobComplete_markComplete');
        var speechOutput = "Job has been marked as completed. Would you like to request payment for the job?";
        var cardTitle = "Job marked as complete";
        var cardContent = speechOutput;
        response.askWithCard(speechOutput, cardTitle, cardContent);
    }
};

module.exports = new jobComplete();