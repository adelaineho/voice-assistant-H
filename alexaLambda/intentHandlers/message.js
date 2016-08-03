'use strict';

function messages() {}

messages.prototype.intentHandlers = {
    "messages_sendMessage": function (intent, session, response) {
        switch (session.attributes.intents.slice(-1)[0]) {
            case 'planDay_getSummary':
                this.storeSessionInfo(session, 'planDay_sendMessage');
                var speechOutput = "Message sent";
                var cardTitle = "Message sent to Sam";
                var cardContent = '"My apologies Sam. The cost for the job is $1,200 including GST. I will send you a written quote tonight."';
                break;
            case 'jobComplete_markComplete':
                this.storeSessionInfo(session, 'planDay_sendMessage');
                var speechOutput = "Personal thank you message to Mary is sent and I've thanked her for the lemonade!";
                var cardTitle = "Thank you message sent";
                var cardContent = "You personal thank you message sent to Mary and I've thanked her for the lemonade!";
                break;
            default:
                var speechOutput = "Who would you like me to send a message to?";
                var cardTitle = "To whom?";
                var cardContent = 'Who would you like me to send a message to?';
        }
        response.askWithCard(speechOutput, cardTitle, cardContent);
    }
};

module.exports = messages;