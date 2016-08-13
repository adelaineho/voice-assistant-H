'use strict';

var jobCompleteService = require('../services/jobComplete');

module.exports = {

    "getMessageType": function (intent) {
        var messageText = intent.slots.messageText.value;
        if (messageText.indexOf('thank') != -1) {
            return 'thank you';
        } else {
            return 'payment reminder';
        }
    },

    "message_sendMessage": function (intent, session, response) {
        var messageText = intent.slots.messageText.value || '';
        var messageType = this.intentHandlers.getMessageType(intent) || '';
        var username = intent.slots.username.value || '';
        var alexaResponse = response;
        var that = this;
        this.storeDataInSession(session, 'message_sendMessage', 'messageText', messageText);

        switch (this.vars.lastIntent) {
            case 'planDay_readMessages':
                this.vars.speechOutput = "Message sent";
                this.vars.cardTitle = "Message sent to Sam";
                this.vars.cardContent = '"My apologies Sam. The cost for the job is $1,200 including GST. I will send you a written quote tonight."';
                this.askWithCard(response);
                break;

            case 'jobComplete_sendPaymentRequest':
                var message = 'Hey Sam, thank you for the job. I have sent through a payment request and thanks for the lemonade. Tom';
                console.log('send message last intent payment request');
                jobCompleteService.sendMessage(message, function(res) {
                    console.log(res);
                    if(res) {
                        console.log('yes res');
                        var username = that.getDataInSession(session, that.vars.lastIntent, 'username');
                        that.vars.speechOutput = "Personal thank you message to " + username + " is sent and I have thanked her for the lemonade";
                        that.vars.cardTitle = "Thank you message sent";
                        that.vars.cardContent = "You personal thank you message sent to " + username + " and I've thanked her for the lemonade!";
                    } else {
                        var username = that.getDataInSession(session, that.vars.lastIntent, 'username');
                        that.vars.speechOutput = "Personal thank you message to " + username + " is sent and I have thanked her for the lemonade";
                        that.vars.cardTitle = "Thank you message sent";
                        that.vars.cardContent = "You personal thank you message sent to " + username + " and I've thanked her for the lemonade!";
                    }
                    that.askWithCard(alexaResponse);
                });
                break;
            default:
                if(username && messageType) {
                    this.vars.speechOutput = "I've sent a " +  messageType + " message to " + username + ".";
                    this.vars.cardTitle = messageType.charAt(0).toUpperCase() + messageType.slice(1) + " message sent";
                    this.vars.cardContent = this.vars.speechOutput;
                } else if (messageType != '') {
                    this.vars.speechOutput = "Would you like me to send a payment reminder message or a thank you message?";
                    this.vars.cardTitle = "Reminder or thank you?";
                    this.vars.cardContent = "What type of message would you like to send?";
                } else {
                    this.vars.speechOutput = "Who would you like me to send a message to?";
                    this.vars.cardTitle = "To whom?";
                    this.vars.cardContent = 'Who would you like me to send a message to?';
                }
                this.askWithCard(response);
                break;
        }
    }
};
