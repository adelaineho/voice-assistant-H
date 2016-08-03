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
var planDay = require('./conversations/planDay');
var accountBalance = require('./conversations/accountBalance');
var jobComplete = require('./conversations/jobComplete');
var howToBeAwesome = require('./conversations/howToBeAwesome');
var jokes = require('./conversations/jokes');
var message = require('./intentHandlers/message');

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

hipages.prototype.storeSessionInfo = function (session, intent) {
    session.attributes.intents = session.attributes.intents || [];
    session.attributes.intents.push(intent);
    console.log(session.attributes.intents);
};

hipages.prototype.intentHandlers = Object.assign({
    "AMAZON.YesIntent": function (intent, session, response) {
        switch (session.attributes.intents.slice(-1)[0]) {
            case 'planDay_getSummary':
                var speechOutput = "Would you like me to give you your leads, read your messages or send reminders for the outstanding payments?";
                var cardTitle = "Please be more specific";
                var cardContent = speechOutput;
                response.askWithCard(speechOutput, cardTitle, cardContent);
                break;
            case 'jobComplete_markComplete':
                this.storeSessionInfo(session, 'jobComplete_markComplete');
                var speechOutput = "Payment request sent. I have also requested feedback from Mary.";
                var cardTitle = "Payment request sent";
                var cardContent = speechOutput;
                response.askWithCard(speechOutput, cardTitle, cardContent);
                break;
            default:
                var speechOutput = "How I can help?";
                var cardTitle = "Hello!";
                var cardContent = speechOutput;
                response.askWithCard(speechOutput, cardTitle, cardContent);
        }
        this.storeSessionInfo(session, 'AMAZON.YesIntent');
    },
    "AMAZON.HelpIntent": function (intent, session, response) {
        this.storeSessionInfo(session, 'AMAZON.HelpIntent');
        var speechOutput = "I can give you a full update, any information regarding your leads and advice on getting more leads or how to better convert your leads.";
        var cardTitle = "How I can help?";
        var cardContent = speechOutput;
        response.askWithCard(speechOutput, cardTitle, cardContent);
    }
}, planDay.intentHandlers,  accountBalance.intentHandlers, jobComplete.intentHandlers, howToBeAwesome.intentHandlers, jokes.intentHandlers, message.intentHandlers);

// Create the handler that responds to the Alexa Request.
var hipagesSkills = function index (event, context) {
    // Create an instance of the hipages skill.
    var hipagesSkill = new hipages();
    hipagesSkill.execute(event, context);
};

// Create the handler that responds to the Alexa Request.
exports.handler = function index (event, context) {
    // Create an instance of the hipages skill.
    var hipagesSkill = new hipages();
    hipagesSkill.execute(event, context);
};

// You can add more handlers here, and reference them in serverless.yaml
