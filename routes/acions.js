/**
 * Created by i855845 on 2/13/17.
 */

var context="";

module.exports = {
    recommend:  function(bot, message)  {
        console.log("Inside recommend");
        context="UnitsUpdate";
        bot.reply(message, messageBuilderAskHelp());
    },
    Ok: function(bot, message)   {
        console.log("Inside Ok");
        if (context == "UnitsUpdate")    {
            bot.reply(message, messageBuilderProvideOptions());
        } else if (context == "OptionProvided")   {
            submitInvoice(bot, message);
        } else   {
            bot.reply(message, "Sorry, I don't understand");
        }
    },
    submitInvoice: function(bot, message)  {
        console.log("Inside submitInvoice ");
        if (context == "UnitsUpdate")    {
            bot.reply(message, messageBuilderProvideOptions());
        } else if (context == "OptionProvided")   {
            submitInvoice(bot, message);
        }else   {
            bot.reply(message, "Sorry, I don't understand");
        }
    },
    current_payment_info:  function(bot, message)   {
        console.log("Inside current_payment_info");
        context="CurrentPaymentInfo";
        bot.reply(message,"If you are approved today, you are scheduled to get paid $2,000 by April 30th, 2017");
    },
    get_payments:  function(bot, message)   {
        console.log("Inside current_payment_info");
        context="RemainingPaymentInfo"
            bot.reply(message,messageBuilderPaymentImage(), function(){
            bot.reply(message, "Is there anything else that I can help with ?");
        });
    },
    final_regards: function(bot, message)   {
        console.log("Final Regards.");
    },
    recommendations_callback: function(bot, message)    {
        console.log("Inside recommendations callback");
        if(message.actions[0].name == "Accept") {
            this.Ok(bot, message);
        }
    },
    help2FixInvoice: function(bot, message) {
        console.log("Inside help2FixInvoice");
        if(message.actions[0].name == "Yes") {
            this.Ok(bot, message);
        }
    },
    submitWithOption1: function(bot, message)   {
        console.log("Inside submitWithOption1");
        if(message.actions[0].name == "Accept") {
            this.Ok(bot, message);
        }
    },
    submitWithOption2: function(bot, message)   {
        console.log("Inside submitWithOption1");
        if(message.actions[0].name == "Accept") {
            this.Ok(bot, message);
        }
    }
};

function messageBuilderAskHelp() {
    var jsonObj = {
        "text": "You invoiced 10 external HD-55 hard drive's, but Herge Oil had rejected 5 units due to wrong specifications.",
        "attachments": [
            {
                "text":"Do you want my help to fix the issue?",
                "fallback": "Sorry for the trouble. Please type Yes or No",
                "callback_id": "help2FixInvoice",
                "color": "#3AA3E3",
                "attachment_type": "default",
                "actions": [
                    {
                        "name": "Yes",
                        "text": "Yes",
                        "style": "primary",
                        "type": "button",
                        "value": "Yes"
                    },
                    {
                        "name": "No",
                        "text": "No",
                        "style": "danger",
                        "type": "button",
                        "value": "No"
                    },
                    {
                        "name": "CallSupport",
                        "text": "Call Support",
                        "style": "primary",
                        "type": "button",
                        "value": "CallSupport"
                    }
                ]
            }
        ]
    };
    return jsonObj;
}

function messageBuilderProvideOptions() {
    context = "OptionProvided";
    var jsonObj = {
        "text":"Select the appropriate option and re-submit the invoice",
        "attachments": [
            {
                "text":"• 80% - Change quantity 10 to 5 units",
                "fallback": "Type, Change 10 to 5",
                "callback_id": "submitWithOption1",
                "color": "#3AA3E3",
                "attachment_type": "default",
                "actions": [
                    {
                        "name": "Accept",
                        "text": "Accept",
                        "style": "primary",
                        "type": "button",
                        "value": "Accept"
                    }
                ]
            },
            {
                "text":"• 90% - Option 1 + Change bill-to address to 3420 Hillview Ave, Palo Alto, 3410 ",
                "fallback": "Type, Change Billing Address and Quantity",
                "callback_id": "submitWithOption2",
                "color": "#3AA3E3",
                "attachment_type": "default",
                "actions": [
                    {
                        "name": "Accept",
                        "text": "Accept",
                        "style": "primary",
                        "type": "button",
                        "value": "Accept"
                    }
                ]
            }
        ]
    };
    return jsonObj;
}

function messageBuilderPaymentImage() {
    console.log("-----messageBuilderPaymentImage Called----")
    var jsonObj = {
        "attachments": [
            {
                "text": "Payment schedule",
                "image_url": "https://peaceful-springs-59601.herokuapp.com/PaymentSchedule",
                "color": "#3AA3E3"
            }
        ]
    };
    return jsonObj;
}

function submitInvoice(bot, message) {
    bot.reply(message, "• Prices :white_check_mark:", function()    {
        setTimeout(function () {
            bot.reply(message, "• Quantities :white_check_mark:", function()    {
                setTimeout(function()   {
                    bot.reply(message, "• Other rules :white_check_mark:", function()   {
                        var invoice = parseInt(global.invoice) + Math.floor((Math.random() * 100) + 1);
                        var msg = "Invoice " + invoice + " is submitted to Herge Oil.";
                        bot.reply(message, msg);
                        context="InvoiceCreated";
                    });
                }, 100);
            });
        }, 100);
    });
}
