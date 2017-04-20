module.change_code = 1;
'use strict';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
var alexa = require( 'alexa-app' );
var app = new alexa.app( 'alexaionskill' );
var Srequest = require('sync-request');
var DOMParser = new (require('xmldom')).DOMParser;


app.launch( function( request, response ) {
    response.say( 'Welcome to your test skill' ).reprompt( 'Way to go. You got it to run. Bad ass.' ).shouldEndSession( false );
} );


app.error = function( exception, request, response ) {
    console.log(exception)
    console.log(request);
    console.log(response);  
    response.say( 'Sorry an error occured ' + error.message);
};

// app.intent('sayNumber',
//   {
//     "slots":{"number":"NUMBER"}
//     ,"utterances":[ 
//         "say the number {1-100|number}",
//         "give me the number {1-100|number}",
//         "tell me the number {1-100|number}",
//         "I want to hear you say the number {1-100|number}"]
//   },
//   function(request,response) {
//     var number = request.slot('number');
//     console.log(request.slot('number'));
//     response.say("You asked for the number "+number);
//   }
// );

app.intent('GetCodeIntent',
  {
    "slots":{"CODENUM1":"LITERAL","CODENUM2":"LITERAL","CODENUM3":"LITERAL","CODENUM4":"LITERAL","CODENUM5":"LITERAL","CODENUM6":"LITERAL","CODENUM7":"LITERAL"}
    ,"utterances":[ 
        "update code {|0-9|CODENUM1} {|0-9|CODENUM2} {|0-9|CODENUM3} {|0-9|CODENUM4} {|0-9|CODENUM5} {|0-9|CODENUM6} {|0-9|CODENUM7}",
        ]
  },
  function(request,response) {
    var code1 = request.slot('CODENUM');
    console.log(request.slot('CODENUM1'));
    console.log(request.slot('CODENUM2'))
    console.log(request.slot('CODENUM3'))
    console.log(request.slot('CODENUM4'))
    console.log(request.slot('CODENUM5'))
    console.log(request.slot('CODENUM6'))
    console.log(request.slot('CODENUM7'))
    response.say("You asked for the code.");
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
    // console.log("Intent GetData fired")
    // var spe echOutput = ""
    // var headers = {
    //     'Accept': 'application/json',
    //     'Authorization': 'Bearer add3e7347d6c92f8f5a18a148a851348',
    //     'x-ionapi-docrequest': 'SWAGGER',
    //     "rejectUnauthorized": false
    // };
    // var options = {
    //     headers: headers
    // };
    // console.log("calling request")

    var options = {
      headers: { 'cache-control': 'no-cache', 'content-type': 'text/xml' },
      body: '<soapenv:Envelope xmlns:pur="http://www.infor.com/businessinterface/GenericQuery" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">'+
                '<soapenv:Header>'+
                    '<pur:Activation>'+
                        '<username>Prefs</username>'+
                        '<password>!nfor08</password>'+
                        '<company>121</company>'+
                    '</pur:Activation>'+
                '</soapenv:Header>'+
                '<soapenv:Body>'+
                    '<pur:Show>'+
                        '<ShowRequest>'+
                            '<DataArea>'+
                                '<GenericQuery>'+
                                    '<Definition>select tcmcs065.cwoc:station, tcmcs065.dsca:desc from tcmcs065 where tcmcs065.cwoc=&quot;LIF-S1&quot;</Definition>'+
                                '</GenericQuery>'+
                            '</DataArea>'+
                        '</ShowRequest>'+
                    '</pur:Show>'+
                '</soapenv:Body>'+
            '</soapenv:Envelope>' 
    };
    var res = Srequest("POST","http://ln2014-1.gdeinfor2.com:8312/c4ws/services/GenericQuery/LN2014_1_121",options);
    console.log("request returned")
    var document = DOMParser.parseFromString(res.body.toString('utf8'));
    var nodesByName = document.getElementsByTagName('NameValue');
    speechOutput = 'Welcome, Data returned was, ' + nodesByName[1].childNodes[0].nodeValue.toString();
    response.say(speechOutput);
  }
);


module.exports = app;
