'use strict';
/**
 Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

 http://aws.amazon.com/apache2.0/

 or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, tell Greeter to say hello"
 *  Alexa: "Hello World!"
 */

/**
 * App ID for the skill
 */
var APP_ID = undefined; //replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./vendor/AlexaSkill');
var message = require('./intentHandlers/message');
var planDay = require('./conversations/planDay');
var accountBalance = require('./conversations/accountBalance');
var jobComplete = require('./conversations/jobComplete');
var howToBeAwesome = require('./conversations/howToBeAwesome');
var jokes = require('./conversations/jokes');

/**
 * hipages is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var hipages = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
hipages.prototype = Object.create(AlexaSkill.prototype);
hipages.prototype.constructor = hipages;

hipages.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("hipages onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
    session.attributes.intents = session.attributes.intents || [];
    session.attributes.data = session.attributes.data || [];
    // any initialization logic goes here
};

hipages.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("hipages onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    var speechOutput = "I can give you a summary, any information regarding your leads and advice on getting more leads or how to better convert your leads.";
    var repromptText = "Don't be shy! How can I help?";
    response.ask(speechOutput, repromptText);
};

hipages.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("hipages onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

hipages.prototype.storeIntentInSession = function (session, intent) {
    session.attributes.intents = session.attributes.intents || [];
    session.attributes.intents.push(intent);
    console.log(session.attributes.intents);
};

hipages.prototype.getLastIntentInSession = function (session, pos) {
    pos = pos || -1;
    console.log('getLastIntentInSession');
    var lastIntent = session.attributes.intents.slice(pos)[0];
    console.log(lastIntent);
    return lastIntent;
};

hipages.prototype.storeDataInSession = function (session, source, key, value) {
    session.attributes.dataInfo = session.attributes.dataInfo || {};
    if (!Array.isArray(session.attributes.dataInfo[source])) {
        session.attributes.dataInfo[source] = [];
    }
    var keyValue = {};
    keyValue[key] = value;
    session.attributes.dataInfo[source].push(keyValue);
};

hipages.prototype.getDataInSession = function (session, source, key) {
    var data = '';
    if (Array.isArray(session.attributes.dataInfo[source])) {
        for (var i in session.attributes.dataInfo[source]) {
            if (session.attributes.dataInfo[source][i].hasOwnProperty(key)) {
                data = session.attributes.dataInfo[source][i][key];
            }
        }
    }
    return data;
};

hipages.prototype.intentHandlers = Object.assign({
    "AMAZON.YesIntent": function (intent, session, response) {
        switch (this.getLastIntentInSession(session)) {
            case 'planDay_getSummary':
                var speechOutput = "Would you like me to give you your leads, read your messages or send reminders for the outstanding payments?";
                var cardTitle = "Please be more specific";
                var cardContent = speechOutput;
                response.askWithCard(speechOutput, cardTitle, cardContent);
                break;
            case 'jobComplete_markComplete':
                var speechOutput = "How much for?";
                var cardTitle = "How much?";
                var cardContent = "I need to know how much for your payment request";
                response.askWithCard(speechOutput, cardTitle, cardContent);
                break;
            default:
                var speechOutput = "How I can help?";
                var cardTitle = "Hello!";
                var cardContent = speechOutput;
                response.askWithCard(speechOutput, cardTitle, cardContent);
        }
        this.storeIntentInSession(session, 'AMAZON.YesIntent');
    },
    "AMAZON.NoIntent": function (intent, session, response) {
    switch (this.getLastIntentInSession(session)) {
        case 'accountBalance_daysCredit' :
            var speechOutput = "Ok";
            response.tell(speechOutput);
            break;
        default :
            var speechOutput = "How I can help.";
            var cardTitle = "Hello";
            var cardContent = speechOutput;
            response.askWithCard(speechOutput, cardTitle, cardContent);
            break;
    }
    this.storeIntentInSession(session, 'AMAZON.NoIntent');
    },
    "AMAZON.HelpIntent": function (intent, session, response) {
        this.storeIntentInSession(session, 'AMAZON.HelpIntent');
        var speechOutput = "I can help you with getting an update on hipages, checking your account balance, completing jobs and advice on how to improve.";
        var cardTitle = "How I can help?";
        var cardContent = speechOutput;
        response.askWithCard(speechOutput, cardTitle, cardContent);
    },
    "AMAZON.CancelIntent": function (intent, session, response) {
        this.storeIntentInSession(session, 'AMAZON.CancelIntent');
        var speechOutput = "Have a nice day. Let's get a beer together one time";
        var cardTitle = "Got it!";
        var cardContent = "Have a nice day. Let's get a beer together one time!";
        response.tellWithCard(speechOutput, cardTitle, cardContent);
    },
    "AMAZON.StopIntent": function (intent, session, response) {
        this.storeIntentInSession(session, 'AMAZON.StopIntent');
        var speechOutput = "Calm down";
        var cardTitle = "Ok bye!";
        var cardContent = "(Calm down...)";
        response.askWithCard(speechOutput, cardTitle, cardContent);
    }
}, planDay.intentHandlers,  accountBalance.intentHandlers, jobComplete.intentHandlers, howToBeAwesome.intentHandlers, jokes.intentHandlers, message.intentHandlers);

// Create the handler that responds to the Alexa Request.
exports.handler = function index (event, context) {
    // Create an instance of the hipages skill.
    var hipagesSkill = new hipages();
    hipagesSkill.execute(event, context);
};

// You can add more handlers here, and reference them in serverless.yaml
