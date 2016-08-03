'use strict';

function message() {}

message.prototype.intentHandlers = {
    "message_sendMessage": function (intent, session, response) {
        switch (this.getLastIntentInSession(session)) {
            case 'planDay_getSummary':
                var speechOutput = "Message sent";
                var cardTitle = "Message sent to Sam";
                var cardContent = '"My apologies Sam. The cost for the job is $1,200 including GST. I will send you a written quote tonight."';
                break;
            case 'jobComplete_sendPaymentRequest':
                var speechOutput = "Personal thank you message to Mary is sent and I've thanked her for the lemonade!";
                var cardTitle = "Thank you message sent";
                var cardContent = "You personal thank you message sent to Mary and I've thanked her for the lemonade!";
                break;
            default:
                var speechOutput = "Who would you like me to send a message to?";
                var cardTitle = "To whom?";
                var cardContent = 'Who would you like me to send a message to?';
        }
        this.storeIntentInSession(session, 'message_sendMessage');
        response.askWithCard(speechOutput, cardTitle, cardContent);
    }
};

module.exports = new message();