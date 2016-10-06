var qwiery = require("../index");
exports.getKafka = function(test) {

    qwiery.getKafka().then(function(r) {
        console.log(r);
        test.done();
    });
};
