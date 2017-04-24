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
    "slots":{"CODE":"ITEMCODES"}
    ,"utterances":[ 
        "How much inventory of item {CODE} do we have",
        "Look up inventory for item {CODE}"
        ]
  },
  function(request,response) {
    var CODE = request.slot('CODE').toUpperCase().replace(/\s/g,'')
    console.log(CODE);
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
                                    '<Definition>select whwmd215.qhnd:qty from whwmd215 where whwmd215.item=&quot;         '+CODE.toString()+'&quot;</Definition>'+
                                '</GenericQuery>'+
                            '</DataArea>'+
                        '</ShowRequest>'+
                    '</pur:Show>'+
                '</soapenv:Body>'+
            '</soapenv:Envelope>' 
    };
    console.log('<Definition>select whwmd215.qhnd:qty from whwmd215 where whwmd215.item=&quot;         '+CODE.toString()+'&quot;</Definition>')
    var res = Srequest("POST","http://ln2014-1.gdeinfor2.com:8312/c4ws/services/GenericQuery/LN2014_1_121",options);
    console.log(res.body.toString('utf8'))
    // var document = DOMParser.parseFromString(res.body.toString('utf8'));
    // var nodeById = document.getElementById('Output');
    // var nodesByName = document.getElementsByTagName('NameValue');
    // var QTY = nodesByName[0].childNodes[0].nodeValue.toString();
    // console.log(QTY);
    speechOutput = 'The Item was '+CODE
    //' has a quantity of '+QTY+' in inventory.'
    response.say(speechOutput);
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
