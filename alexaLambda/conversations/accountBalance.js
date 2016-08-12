'use strict';

function AccountBalance() {}

AccountBalance.prototype.intentHandlers = {
    "accountBalance_leadCredit": function (intent, session, response) {
        //get summary data
        this.vars.speechOutput = "You have used $20 lead credit this month. You have $50 lead credits remaining";
        this.vars.cardTitle = "Lead Credit Balance";
        this.vars.cardContent = this.vars.speechOutput;
        this.askWithCard(response);
    },

    "accountBalance_daysCredit": function (intent, session, response) {
        //get summary data
        this.vars.speechOutput = "You have 20 days until your credit resets. At the current rate you will run out of credit before the end of the month. You can upgrade to the $299 cap for an additional $100. This will give you an additional $150 credit per month. Would you like to proceed?";
        this.vars.cardTitle = "Remaining Days Credit";
        this.vars.cardContent = this.vars.speechOutput;
        this.storeIntentsWaitingResponseInSession(session, 'accountBalance_daysCredit');
        this.askWithCard(response);
    },

    "accountBalance_daysCreditYes": function (intent, session, response) {
        //get summary data
        this.vars.speechOutput = "You have been upgraded to the $299 cap for an additional $100";
        this.vars.cardTitle = "Upgrade Notice";
        this.vars.cardContent = this.vars.speechOutput;
        this.removeIntentsWaitingResponseInSession(session);
        this.askWithCard(response);
    },

    "accountBalance_daysCreditNo": function (intent, session, response) {
        this.removeIntentsWaitingResponseInSession(session);
        this.vars.speechOutput = "Ok";
        this.ask(response);
    },

    "accountBalance_daysCreditHelp": function (intent, session, response) {
        //get summary data
        this.vars.speechOutput = "Say YES to upgrade your account to the $299 cap for an additional $100. No to cancel";
        this.vars.cardTitle = "Upgrade Account Help";
        this.vars.cardContent = this.vars.speechOutput;
        this.askWithCard(response);
    }
};

module.exports = new AccountBalance();