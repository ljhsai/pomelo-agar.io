var pomelo = require('pomelo-fresh');
var routeUtil = require("./app/util/routeUtil");

/**
 * Init app for client.
 */
var app = pomelo.createApp();
app.set('name', 'pomelo-agar.io');

// app configuration
app.configure('production|development', 'connector', function(){
  app.set('connectorConfig',
    {
      connector : pomelo.connectors.sioconnector,
      //websocket, htmlfile, xhr-polling, jsonp-polling, flashsocket
      transports : ['websocket'],
      heartbeats : true,
      heartbeatTimeout : 60,
      heartbeatInterval : 25
    });
});

app.configure('production|development', function() {
    app.route('chat', routeUtil.chat);
    app.filter(pomelo.timeout());
});

app.start();

process.on('uncaughtException', function (err) {
  console.error(' Caught exception: ' + err.stack);
});
