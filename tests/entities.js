var qwiery = require("../index");


exports.updateEntity = function(test) {
    var product = {
        UnitPrice: 188.08,
        UnitsInStock: 95,
        Discontinued: false,
        DataType: "Product",
        Title: "GetEntity test " + qwiery.randomId(),
        "Id": qwiery.guid(),
    };


    qwiery.upsertEntity(product)
        .then(function(data) {
            test.ok(data !== null);
            console.log(data);
            test.done();
        });
};

// You can use $typekey, Type or type to specify the type of object to create.
// Just Title and Description leads to a Thought.
exports.upsertWithFew = function(test) {
    var entity = {
        Title: "Elvis",
        Description: "The King"
    };
    qwiery.upsertEntity(entity).then(function(id) {
        qwiery.getEntity(id).then(function(data) {
            test.ok(qwiery.isDefined(data));
            test.ok(data && data.DataType === "Thought");
            test.done();
        });
    });
};

exports.upsertWithType = function(test) {
    var entity = {
        Title: "Elvis",
        Description: "The King",
        Type: "Address"
    };
    qwiery.upsertEntity(entity).then(function(id) {
        qwiery.getEntity(id).then(function(data) {
            test.ok(data.DataType === "Address");
            test.done();
        });
    });
};

exports.GetUpsertMany = function(test) {
    var entities = [];
    for(var k = 0; k < 7; k++) {
        entities.push({
            Title: "Entity " + qwiery.randomId()
        });
    }
    qwiery.upsertEntities(entities).then(function(ids) {
        test.ok(ids.length === 7);
        qwiery.getEntities(ids).then(function(data) {
            test.ok(qwiery.isDefined(data));
            test.ok(data.length === 7);
            test.done();
        });
    });
};


exports.GetUpdateEntity = function(test) {
    var product = {
        UnitPrice: Math.floor(Math.random() * 1000),
        UnitsInStock: 95,
        Discontinued: false,
        DataType: "Product",
        Title: "GetEntity test " + qwiery.randomId(),
        "Id": qwiery.guid(),
    };
    var newTitle = "New title " + qwiery.randomId();
    qwiery.upsertEntity(product)
        .then(function(id) {
            test.ok(id !== null);
            console.log("New entity added: " + id);
            // get it
            qwiery.getEntity(id).then(function(data) {
                test.ok(data.Id === id);
                data.Title = newTitle;
                // update it
                qwiery.upsertEntity(data).then(function(id) {
                    // get it again
                    qwiery.getEntity(id).then(function(newdata) {
                        test.ok(newdata.Title === newTitle);
                        test.done();
                    });
                });
            });
        });
};


exports.AddGetDeleteEntity = function(test) {
    var product = {
        UnitPrice: Math.floor(Math.random() * 1000),
        UnitsInStock: 95,
        Discontinued: false,
        DataType: "Product",
        Title: "GetEntity test " + qwiery.randomId(),
        "Id": qwiery.guid(),
    };
    qwiery.upsertEntity(product)
        .then(function(id) {
            test.ok(id !== null);
            console.log("New entity added: " + id);
            qwiery.getEntity(id).then(function(data) {
                test.ok(data.Id === id);
                console.log("Entity was fetched.");
                qwiery.deleteEntity(id).then(function(success) {
                    test.ok(success.toString() === "true");
                    qwiery.getEntity(id).then(function(shouldbeempty) {
                        test.ok(shouldbeempty === null);
                        console.log("Entity was deleted.");
                        test.done();
                    });
                });
            });
        });
};