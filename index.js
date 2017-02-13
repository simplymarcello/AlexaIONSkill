module.change_code = 1;
'use strict';

var alexa = require( 'alexa-app' );
var app = new alexa.app( 'alexaionskill' );


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
        "respond with the number {1-100|number}",
        "I want to hear you say the number {1-100|number}"]
  },
  function(request,response) {
    var number = request.slot('number');
    response.say("You asked for the number "+number);
  }
);

// app.intent('getData',
//   {
//       "utterances":[ 
//         "get data",
//         "process data"]
//   },
//   function(request,response) {
//     http = require("http")
//     url  = require("url")

//     proxy = url.parse(process.env.PROXIMO_URL)

//     options =
//       hostname: proxy.hostname
//       port:     proxy.port || 80
//       path:     "https://jsonplaceholder.typicode.com/posts/1"
//       headers:
//         "Proxy-Authorization": "Basic #{new Buffer(proxy.auth).toString("base64")}"

//     http.get options, (res) ->
//       console.log "status code", res.statusCode
//       console.log "headers", res.headers
//     response.say("You asked for the number "+number);
//   }
// );


module.exports = app;