var qwiery = require("../index");
exports.getSentiment = function(test) {

    qwiery.getSentiment("The massive recall of one of Samsung's flagship devices is an embarrassing setback for the world's biggest selling smartphone maker. The Note 7 was unveiled just a month ago, and big rival Apple (AAPL, Tech30) is expected to show off its new smartphone next week.").then(function(r) {
        console.log(r);
        test.done();
    });

};