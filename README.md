###Qwiery NodeJS client

This is a NodeJS module to access, manage and consume the [Qwiery](http://www.qwiery.com) services. It's a wrapper around the various services and makes it easy to integrate natural language understanding services into your apps.

You can also find [a browser client on Github](https://github.com/Qwiery/Qwiery-Client-JS) as well as various other utilities and modules.

---

#### Install

    npm i qwiery
    
While in beta the service can be used freely but you are encouraged to [register to obtain your own private API key](http://www.qwiery.com/login).

#### Usage

You can find [interactive API docs here](http://dashboard.qwiery.com/dashboard/apidocs/) and [the Swagger specs are also available](http://api.qwiery.com/swagger.json). The swagger specs can in addition generate dozens of other API clients, see the [Swagger.io](http://swagger.io) site for more info.

For example, to fetch the sentiments contained in a piece of text use something like:

    var qwiery = require("qwiery");
    qwiery.apiKey = "Anonymous"; // ***Your Key Here***
    var text = "The massive recall of one of Samsung's flagship devices is an embarrassing setback for the world's biggest selling smartphone maker.";
    qwiery.getSentiment(text).then(function(r) {
                                                 console.log("Score: " + r.score);
                                                 console.log("Positive words: " + r.positive.join(", ));
                                                 console.log("Negative words: " + r.negative.join(", ));
                                              });
    

--- 
#### Unit tests
Some of the unit tests require admin privileges on Qwiery and have been commented out. There are plenty of tests which go beyond simple testing of the API methods and should give you insights on how Qwiery can be used and how the semantic network, in particular, can be used together with the bot-like functionality of Qwiery.

To change the Qwiery URL, use

    qwiery.serviceURL = "http://api.qwiery.com/"

To use your apiKey

    qwiery.apiKey = "your secret key";
    
You can obtain a key by registering and the key can be found as shown in the image below

![apikeylocation](https://cloud.githubusercontent.com/assets/2377906/18826353/4351898a-83cd-11e6-8f40-066201591935.png)
     


---
#### Support and feedback

 - [Twitter](http://twitter.com/qwiery)
 - [info@qwiery.com](mailto:info@qwiery.com)
 - [Github](http://github.com/qwiery)
