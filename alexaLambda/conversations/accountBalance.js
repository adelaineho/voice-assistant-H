'use strict';

function accountBalance() {}

accountBalance.prototype.intentHandlers = {
    "accountBalance_leadCredit": function (intent, session, response) {
        //get text back and say same greeting
        //get summary data
        this.storeSessionInfo(session, 'accountBalance_leadCredit');
        var speechOutput = "You have used $20 lead credit so far this month. You have $50 lead credits remaining";
        var cardTitle = "Lead Credit Balance";
        var cardContent = speechOutput;
        response.askWithCard(speechOutput, cardTitle, cardContent);
    },
    "accountBalance_daysCredit": function (intent, session, response) {
        //get text back and say same greeting
        //get summary data
        this.storeSessionInfo(session, 'accountBalance_daysCredit');
        var speechOutput = "You have 20 days until your credit resets. At the current rate you will run out of credit before the end of the month. <break time='.5s'/> You can upgrade to the $299 cap for an additional $100. This will give you an additional $150 credit per month. Would you like to proceed?";
        var cardTitle = "Remaining Days Credit";
        var cardContent = speechOutput;
        response.askWithCard(speechOutput, cardTitle, cardContent);
    },

};

module.exports = new accountBalance();