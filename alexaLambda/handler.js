'use strict';
/**
 * App ID for the skill
 */
var APP_ID = undefined; //replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./vendor/AlexaSkill');
var message = require('./intentHandlers/message');
var generic = require('./conversations/generic');
var planDay = require('./conversations/planDay');
var jobComplete = require('./conversations/jobComplete');
var accountBalance = require('./conversations/accountBalance');
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

//class variables
hipages.prototype.vars = {
    currentIntent : '',
    lastIntent : '',
    waitingIntent: '',
    speechOutput : '',
    cardTitle : '',
    cardContent : '',
    repromptSpeech : ''
};

/**
 * Response
 */
hipages.prototype.tell = function (response) {
    response.tell(this.vars.speechOutput);
};

hipages.prototype.tellWithCard = function (response) {
    response.tellWithCard(this.vars.speechOutput, this.vars.cardTitle, this.vars.cardContent);
};

hipages.prototype.ask = function (response) {
    response.ask(this.vars.speechOutput, this.vars.repromptSpeech);
};

hipages.prototype.askWithCard = function (response) {
    response.askWithCard(this.vars.speechOutput, this.vars.cardTitle, this.vars.cardContent, this.vars.repromptSpeech);
};

//General methods
hipages.prototype.storeIntentInSession = function (session, intent) {
    session.attributes.intents = session.attributes.intents || [];
    session.attributes.intents.push(intent);
    console.log('storeIntentInSession');
    console.log(session.attributes.intents);
};

hipages.prototype.getLastIntentInSession = function (session, pos) {
    pos = pos || -1;
    var lastIntent = '';
    if (!Array.isArray(session.attributes.intents)) {
        lastIntent = session.attributes.intents.slice(pos)[0];
    }
    console.log('getLastIntentInSession');
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
    console.log('storeDataInSession');
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
    console.log('getDataInSession');
    console.log('data');
    return data;
};

hipages.prototype.storeIntentsWaitingResponseInSession = function (session, intent) {
    session.attributes.intentsWaitingResponse = intent;
    console.log('storeIntentsWaitingResponseInSession');
    console.log(session.attributes.intentsWaitingResponse);
};

hipages.prototype.getIntentsWaitingResponseInSession = function (session) {
    var lastIntent = '';
    if (session.attributes.intentsWaitingResponse) {
        lastIntent = session.attributes.intentsWaitingResponse;
    }
    console.log('getIntentsWaitingResponseInSession');
    console.log(lastIntent);
    return lastIntent;
};

hipages.prototype.removeIntentsWaitingResponseInSession = function (session) {
    session.attributes.intentsWaitingResponse = '';
    console.log('removeIntentsWaitingResponseInSession');
    console.log(session.attributes.intentsWaitingResponse);
};

/**
 *
 * Event handlers
 *
 */

/**
 * Overwrite method onSessionStarted
 *
 * @param sessionStartedRequest
 * @param session
 */
hipages.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("hipages onSessionStarted requestId: " + sessionStartedRequest.requestId
    + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
    session.attributes = session.attributes || {};
    session.attributes.intents = session.attributes.intents || [];
    session.attributes.intentsWaitingResponse = session.attributes.intentsWaitingResponse || '';
    session.attributes.dataInfo = session.attributes.dataInfo || [];
};


/**
 * Overwrite method onLaunch
 *
 * @param launchRequest
 * @param session
 * @param response
 */
hipages.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("hipages onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    this.vars.speechOutput = "I can give you a summary, any information regarding your leads and advice on getting more leads or how to better convert your leads.";
    this.vars.repromptText = "Don't be shy! How can I help?";
    this.ask(response);
};

/**
 * Overwrite method onSessionEnded
 *
 * @param sessionEndedRequest
 * @param session
 */
hipages.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("hipages onSessionEnded requestId: " + sessionEndedRequest.requestId
    + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

/**
 * Overwrite method onIntent
 * Called when the user specifies an intent.
 *
 * @param intentRequest
 * @param session
 * @param response
 */
hipages.prototype.eventHandlers.onIntent = function (intentRequest, session, response) {
    var intent = intentRequest.intent,
        intentName = intentRequest.intent.name,
        intentHandler = this.intentHandlers[intentName];
    if (intentHandler) {
        console.log('dispatch intent = ' + intentName);
        this.vars.currentIntent = intentName;
        this.vars.lastIntent = this.getLastIntentInSession(session);
        this.vars.waitingIntent = this.getIntentsWaitingResponseInSession(session);
        this.vars.speechOutput = '';
        this.vars.cardTitle = '';
        this.vars.cardContent = '';
        this.vars.repromptSpeech = '';
        this.storeIntentInSession(session, intentName);
        intentHandler.call(this, intent, session, response);
    } else {
        throw 'Unsupported intent = ' + intentName;
    }
};


/**
 * Register new intend handlers
 *
 * @param reqisterIntedHandler
 */
hipages.prototype.registerIntendHandler = function (reqisterIntedHandler) {
    this.intentHandlers = Object.assign(this.intentHandlers, reqisterIntedHandler);
};

// Create the handler that responds to the Alexa Request.
exports.handler = function index (event, context) {
    // Create an instance of the hipages skill.
    var hipagesSkill = new hipages();
    hipagesSkill.registerIntendHandler(generic.intentHandlers);
    hipagesSkill.registerIntendHandler(planDay.intentHandlers);
    hipagesSkill.registerIntendHandler(accountBalance.intentHandlers);
    hipagesSkill.registerIntendHandler(jobComplete.intentHandlers);
    hipagesSkill.registerIntendHandler(howToBeAwesome.intentHandlers);
    hipagesSkill.registerIntendHandler(jokes.intentHandlers);
    hipagesSkill.registerIntendHandler(message.intentHandlers);
    hipagesSkill.execute(event, context);
};

// You can add more handlers here, and reference them in serverless.yaml
