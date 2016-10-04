var qwiery = require("../index");
var _ = require("lodash");
exports.Topics = function(test) {

    var topic = qwiery.randomId();

    qwiery.ask('Add topic ' + topic)
        .then(function() {
            qwiery.getTopics()
                .then(function(topics) {

                    test.ok(topics.length > 0);
                    var found = _.find(topics, function(r) {
                        return r.Type === topic;
                    });
                    test.ok(qwiery.isDefined(found));
                    test.done();
                });
        });
};

exports.Personalization = function(test) {
    var value = qwiery.randomId();

    qwiery.ask('Add personalization ' + value)
        .then(function() {
                qwiery.getPersonalization()

                    .then(function(pers) {
                        var key;
                        var found = _.find(pers, function(v) {

                            if(v.value === value) {
                                key = v.key;
                                return true;
                            } else {
                                return false;
                            }
                        });
                        test.ok(qwiery.isDefined(found));
                        test.ok(qwiery.isDefined(key));
                        qwiery.clearPersonalization(key).then(function() {
                            // should be gone now
                            qwiery.getPersonalization().then(function(pers2) {
                                found = _.find(pers2, function(v, k) {
                                    return k === key;
                                });
                                test.ok(qwiery.isUndefined(found));
                                test.done();
                            });
                        });
                    });
            }
        );
};

exports.Personality = function(test) {

    // Predefined personality values get mapped to an MBTI type
    // If there is no mapping (which happens for random values) there won't be an MBTI type.
    var value = 'Factual';

    qwiery.ask('Add personality ' + value)
        .then(function() {
                qwiery.getPersonality()

                    .then(function(pers) {

                            var found = _.find(pers, function(r) {
                                return r.Type === value;
                            });
                            test.ok(qwiery.isDefined(found));
                            // to know the value I'd have to reset all values and so on
                            //test.ok(pers[value]===1);
                            qwiery.getPsy().then(function(f) {
                                var count = 0;
                                for(var m in f) {
                                    if(f.hasOwnProperty(m)) {
                                        count++;
                                    }
                                }
                                test.ok(count > 0);
                                test.done();
                            });
                        }
                    )
                ;

            }
        );
};

exports.User = function(test) {
    qwiery.apiKey = "Sharon";
    qwiery.getUser()
        .then(function(u) {
            test.equal(u.Username, "Sharon Ambjorn");
            test.done();
        });
};

exports.Trail = function(test) {
    var question = "Unit test " + qwiery.randomId();
    var count;
    qwiery.ask("Hello").then(function() {
            qwiery.getTrail()

                .then(function(u) {
                    count = u.length;
                    test.ok(count > 0);
                    qwiery.ask(question).then(function() {
                        qwiery.getTrail().then(function(t) {
                            var q = t[0].Input;
                            test.ok(q === question);
                            test.done();
                        });
                    });

                });
        }
    );
};

exports.useStats = function(test) {
    var thought = {
        DataType: "Thought",
        Title: "Stats test " + qwiery.randomId(),
        "Id": qwiery.guid()
    };
    var count;
    qwiery.getStats()
        .then(function(stats) {
            count = stats.NodeCount;
            qwiery.upsertEntity(thought).then(function() {
                qwiery.getStats().then(function(statsAfter) {
                    test.ok(statsAfter.NodeCount = count + 1);
                    test.done();
                })
            });
        });
};

exports.getUserContext = function(test) {

    var count;
    qwiery.ask("Hello").then(function() {
            qwiery.getHistory(17)

                .then(function(history) {
                    test.ok(history.length <= 17);
                    var one = _.sample(history);
                    qwiery.getHistoryItem(one.CorrelationId).then(function(item) {
                        test.ok(qwiery.isDefined(item));
                        test.ok(item.Key.CorrelationId === one.CorrelationId);
                        test.done();
                    });
                });
        }
    );

};