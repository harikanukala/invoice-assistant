/**
 * Created by i854911 on 3/2/17.
 */
var slack_bot = null;

function Bot()  {

    var bot = {};

    bot.init = function(controller, incoming_webhook_url, slack_bot_token)  {

        console.log("Defining slackbot");
        console.log(slack_bot_token);
        console.log(incoming_webhook_url);

        slack_bot = controller.spawn({
            token: slack_bot_token,
            incoming_webhook: {
                url: incoming_webhook_url
            }
        });

        slack_bot.startRTM(function (err) {
            if (err) {
                console.error(`Error: Could not start the bot - ${err}`);
            }
        });
    };

    bot.postNotification = function(notification)    {

        // console.log("Slack_bot");
        // console.log(slack_bot);

        slack_bot.sendWebhook({
            text: notification.message
        }, (err, res) =>    {
            if(err) {
                console.log("Error in posting to incoming webhook");
                return;
            }
            console.log("Posted to Incoming webhook successfully");
            console.log(res);
        });
    };

    return bot;
}

module.exports = Bot;