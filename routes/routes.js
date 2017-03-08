/**
 * Created by i854911 on 2/20/17.
 */

module.exports = function(app)  {

    app.get('/', function(req, res, next) {
        res.render('index', { title: 'Express' });
    });

    app.post('/reject/:id(\\d+)', function(req, res, next)  {

        var bot = require('./bot')();

        console.log(bot);

        var notification = {
          message : "Invoice " + req.params.id + " is rejected by Herge Oil on 3/21/2017"
        };

        global.invoice = req.params.id;

        bot.postNotification(notification);

        res.send("Rejected Invoice: " + req.params.id);
    });
    //
    // app.get('/oauth', function(req, res) {
    //     if (!req.query.code){
    //         console.log(req);
    //         res.status(500);
    //         res.send({"Error": "Looks like we're not getting code."});
    //         console.log("Looks like we're not getting code.");
    //     } else {
    //         request({
    //             url: 'https://slack.com/api/oauth.access', //URL to hit
    //             qs: {code: req.query.code, client_id: clientId, client_secret: clientSecret}, //Query string data
    //             method: 'GET', //Specify the method
    //
    //         }, function (error, response, body) {
    //             if (error) {
    //                 console.log(error);
    //             } else {
    //                 res.json(body);
    //
    //             }
    //         })
    //     }
    //
    // });
};
