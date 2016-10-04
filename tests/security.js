var qwiery = require("../index");
exports.getUserContext = function(test) {
    qwiery.getContextFromApiKey("Sharon").then(function(ctx) {
        test.equal(ctx.userId, "Sharon");
        test.done();
    });
}