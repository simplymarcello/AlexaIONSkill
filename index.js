module.change_code = 1;
'use strict';

var alexa = require( 'alexa-app' );
var app = new alexa.app( 'alexaionskill' );
var https = require('https');


app.launch( function( request, response ) {
    response.say( 'Welcome to your test skill' ).reprompt( 'Way to go. You got it to run. Bad ass.' ).shouldEndSession( false );
} );


app.error = function( exception, request, response ) {
    console.log(exception)
    console.log(request);
    console.log(response);  
    response.say( 'Sorry an error occured ' + error.message);
};

app.intent('sayNumber',
  {
    "slots":{"number":"NUMBER"}
    ,"utterances":[ 
        "say the number {1-100|number}",
        "give me the number {1-100|number}",
        "tell me the number {1-100|number}",
        "I want to hear you say the number {1-100|number}"]
  },
  function(request,response) {
    var number = request.slot('number');
    response.say("You asked for the number "+number);
  }
);

app.intent('getData',
  {
    "utterances":[ 
        "get data",
        "pull data"
    ]
  },
  function(request,response) {
    var options = {
        host: '52.5.106.181',
        port: 7443,
        path: "/ionapi/metadata/v1/infor/version",
        method: 'GET',
        rejectUnauthorized: false,
        headers: { 
            'Accept': 'application/json',
            'Authorization': 'Bearer aeb07dd32a1e6e6120bd1dbcf962c316',
            'x-ionapi-docrequest': 'SWAGGER' 
        }

    };
    var req = https.request(options, function(res) {
      res.on('data', function(d) {
          const speechOutput = 'Welcome, the current version number of the Metadata API is ' + d.toString('utf8');
          repsonse.say(speechOutput);
      });
      res.on('error', function(err) {
          const speechOutput = 'Welcome, I was unable to get the version number of the Metadata API.';
          repsonse.say(speechOutput);
      });
    });
  }
);

module.exports = app;