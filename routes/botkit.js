/**
 * Created by i854911 on 2/6/17.
 */
const Botkit = require('botkit');
const actions = require("./acions");
const bot = require("./bot")();
const path = require("path");

function BotKit(app)  {
    var botkit = {};

    var clientId = '135147242677.142534151139';
    var clientSecret = '224502f99ebf322637fd9ef1daaa7303';

// Checking for the wit token
    if (!process.env.WIT_TOKEN) {
        console.error('Error: Specify a Wit token in an environment variable');
        process.exit(1);
    }

    var wit = require('./wit')({
        accessToken: process.env.WIT_TOKEN,
        apiVersion: '20160516',
        minConfidence: 0.6,
        logLevel: 'debug'
    });

// Creates the Slack bot
    const controller = Botkit.slackbot({
        json_file_store:path.join(__dirname + '/../' + 'db')
    });

    controller.configureSlackApp({
        clientId: clientId,
        clientSecret: clientSecret,
        scopes: ['incoming-webhook','team:read','users:read','channels:read','im:read','im:write','groups:read','emoji:read','chat:write:bot']
    });

    controller.createOauthEndpoints(app, function(err, req, res)    {
        res.status(200).end();
    });

    controller.createWebhookEndpoints(app);

    var incoming_webhook_url;

    controller.on('create_incoming_webhook',function (bot,incoming_webhook) {
        console.log('incoming_webhook----------');
        console.log(incoming_webhook);
        incoming_webhook_url=incoming_webhook.url;
    });

    var slack_bot_token;

    controller.on('create_bot',function (_bot,team_bot) {
        console.log('bot-token----------');
        console.log(team_bot.token);

        slack_bot_token=team_bot.token;
        bot.init(controller, incoming_webhook_url, slack_bot_token);
    });

    controller.storage.teams.all(function (err, teams) {
        console.log('teams----');
        console.log(teams);
        if(teams.length == 0) {
            return;
        }
        console.log(teams[0]);
        bot.init(controller, teams[0].incoming_webhook.url, teams[0].bot.token);
    });

    controller.middleware.receive.use(wit.receive);

    controller.hears(['(.*)'], 'direct_message,direct_mention,mention', (bot, message) => {

        console.log(message);

        if(message.entities.intent == undefined) {
            bot.reply(message, "Sorry, I don't understand.");
            return;
        }
        var intent = message.entities.intent[0].value;

        console.log("Intent: " + intent);

        if(actions[intent] == undefined || actions[intent] == null) return;
        actions[intent](bot, message);
    });

    controller.on('interactive_message_callback', function(bot, message) {
        console.log('triggered----');
        console.log(message.callback_id);
        actions[message.callback_id](bot, message);
    });

    return botkit;
}

module.exports = BotKit;
