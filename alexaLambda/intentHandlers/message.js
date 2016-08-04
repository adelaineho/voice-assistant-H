'use strict';

function message() {}

message.prototype.intentHandlers = {
    "getMessageType": function (intent) {
        var messageText = intent.slots.messageText.value;
        if(messageText.indexOf('thank') != -1) {
            return 'thank you';
        } else {
            return 'payment reminder';
        }
    },
    "message_sendMessage": function (intent, session, response) {
        var messageText = intent.slots.messageText.value || '';
        var messageType = this.intentHandlers.getMessageType(intent) || '';
        var username = intent.slots.username.value || '';
        this.storeDataInSession(session, 'message_sendMessage', 'messageText', messageText);
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
                if(username && messageType) {
                    var speechOutput = "I've sent a " +  messageType + " message to " + username + ".";
                    var cardTitle = messageType.charAt(0).toUpperCase() + messageType.slice(1) + " message sent";
                    var cardContent = speechOutput;
                } else if (messageType != '') {
                    var speechOutput = "Would you like me to send a payment reminder message or a thank you message?";
                    var cardTitle = "Reminder or thank you?";
                    var cardContent = "What type of message would you like to send?";
                } else {
                    var speechOutput = "Who would you like me to send a message to?";
                    var cardTitle = "To whom?";
                    var cardContent = 'Who would you like me to send a message to?';
                }
        }
        this.storeIntentInSession(session, 'message_sendMessage');
        response.askWithCard(speechOutput, cardTitle, cardContent);
    }
};

module.exports = new message();