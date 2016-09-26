var qwiery = require("../index");


exports.ping = function(test) {

    qwiery.ping().then(function(a) {
        console.log(a);
        test.ok(a !== null && a.length > 0 && a.indexOf("Qwiery") > -1);
        test.done();
    });
};

exports.ask = function(test) {
    qwiery.ask("What is the meaning of life?").then(function(session) {
        try {
            var msg = session.Output.Answer[0].Content;
            console.log(msg);
            test.ok(msg.indexOf("not sure") > -1);
            test.done();
        }
        catch(e) {
            test.ok(false);
            test.done();
        }
    }).catch(function(err) {
        test.ok(false);
        console.log(err);
        test.done();
    });
};


exports.randomQuestion = function(test) {
    qwiery.lexicRandomQuestion().then(function(r) {
        console.log("Random question: " + r);
        test.ok(qwiery.isDefined(r) && r.length > 0);
        test.done();
    }).catch(function(err) {
        test.ok(false);
        console.log(err);
        test.done();
    });
};

exports.testQuestion = function(test) {
    qwiery.ask("Special test question")
        .then(function(reply) {
            try {
                var answer = reply.Output.Answer[0].Content;
                test.ok(answer === "This is part of a testing procedure, please ignore.");
            } catch(e) {
                ok(false);
            }
            test.done();
        });
};


exports.questionExists = function(test) {

    qwiery.lexicExists("Hello $1")
        .then(function(b) {
            test.ok(b.toString() === "true");
            test.done();
        });
};

exports.questionShouldNotExist = function(test) {
    qwiery.lexicExists("asdf hasdlkfjh as")
        .then(function(b) {
            test.ok(b.toString() === "false");
            test.done();
        });
};

exports.randomRecord = function(test) {
    qwiery.lexicRandomRecord()
        .then(function(r) {
            var reply = JSON.parse(r);
            try {
                var question = reply.Grab;
                console.log(question);
                test.ok(qwiery.isDefined(question));
            } catch(e) {
                test.ok(false);
            }
            test.done();
        });
};
