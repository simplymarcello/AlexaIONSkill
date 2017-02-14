module.change_code = 1;
'use strict';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
var alexa = require( 'alexa-app' );
var app = new alexa.app( 'alexaionskill' );
var request = require('sync-request');


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

    var speechOutput = ""
    var options = {
        host: '52.5.106.181',
        port: 7443,
        path: "/ionapi/metadata/v1/infor/version",
        method: 'GET',
        rejectUnauthorized: false,
        headers: { 
            'Accept': 'application/json',
            'Authorization': 'Bearer 3732a6052dfd0962a76dca14a09f043f',
            'x-ionapi-docrequest': 'SWAGGER' 
        }

    };
    var res = request("get","https://52.5.106.181:7443/ionapi/metadata/v1/infor/version",options);
    speechOutput = 'Welcome, the current version number of the Metadata API is ' + res.body.toString('utf8');
    response.say(speechOutput);
  }
);


module.exports = app;
