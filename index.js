/*
 * Qwiery NodeJS client, v2016.9.19.
 * http://www.qwiery.com
 * Copyright 2016, Qwiery by Orbifold Consulting (http://www.orbifold.net)
 * */
var request = require('request-promise-native');
var serviceURL = "http://localhost:4785";// "http://api.qwiery.com";
var timeout = 10000;
module.exports = {
    /***
     * This sets the apiKey across all calls.
     * Use the key from http://www.qwiery.com/login
     */
    apiKey: "Anonymous",


    // <editor-fold desc="Lexic"> 
    /***
     * Asks Qwiery a question.
     * @param question The question you wish to ask.
     * @returns {Promise}
     */
    ask: function(question) {

        var opt = {
            url: serviceURL + "/lexic/question",
            method: "POST",
            headers: {
                "apiKey": this.apiKey
            },
            timeout: timeout,
            json: {question: question}
        }
        return request(opt);
    },

    /**
     * Upserts the lexic records.
     * @param newRecord The record to upsert.
     * @returns {Promise}
     */
    lexicUpsert: function(newRecord) {
        var opt = {
            url: serviceURL + '/lexic/upsert/',
            json: newRecord,
            headers: {
                "apiKey": this.apiKey
            },
            method: "POST",
            timeout: timeout
        };
        return request(opt);
    },

    /**
     * Deletes a lexic record.
     * @param id An identifier.
     * @returns {Promise}
     */
    lexicDelete: function(id) {
        var opt = {
            url: serviceURL + '/lexic/delete/' + id,
            headers: {
                "apiKey": this.apiKey
            },
            method: 'GET',
            timeout: timeout
        };
        return request(opt);
    },

    /**
     * Returns a random lexic record.
     * @returns {Promise}
     */
    lexicRandomRecord: function() {
        var opt = {
            url: serviceURL + '/lexic/randomRecord/',
            headers: {
                "apiKey": this.apiKey
            },
            method: "GET",
            timeout: timeout
        };
        return request(opt);
    },

    /**
     * Returns a random lexic question.
     * @returns {Promise}
     */
    lexicRandomQuestion: function() {
        var opt = {
            url: serviceURL + '/lexic/randomQuestion/',
            headers: {
                "apiKey": this.apiKey
            },
            method: "GET",
            timeout: timeout
        };
        return request(opt);
    },

    /***
     * Returns whether the given question exists in the lexic store.
     * @param question
     * @returns {*}
     */
    lexicExists: function(question) {
        var opt = {
            url: serviceURL + '/lexic/exists/',
            headers: {
                "apiKey": this.apiKey
            },
            qs: {question: question},
            method: "GET",
            timeout: timeout
        };
        return request(opt);
    },

    lexicDefault: function() {
        var opt = {
            url: serviceURL + '/lexic/defaults/',
            headers: {
                "apiKey": this.apiKey
            },
            method: "GET",
            timeout: timeout
        };
        return request(opt);
    },

    lexicGet: function(id) {
        var opt = {
            url: serviceURL + '/lexic/get/' + id,
            headers: {
                "apiKey": this.apiKey
            },
            method: "GET",
            timeout: timeout
        };
        return request(opt);
    },

    /***
     * Returns whether the given template is valid.
     * @param template
     * @returns {*}
     */
    lexicValidate: function(qtl) {
        var opt = {
            url: serviceURL + '/lexic/validate/',
            headers: {
                "apiKey": this.apiKey
            },
            json: JSON.stringify(qtl),
            method: "POST",
            timeout: timeout
        };
        return request(opt);
    },
    // </editor-fold> 

    //<editor-fold desc="Graph">
    /**
     * Updates the given entity.
     * @param {JSON} data An entity in JSON format.
     * @returns {}
     */
    upsertEntity: function(obj) {
        var data;
        if(obj.entity) {
            data = obj;
        } else {
            data = {"entity": obj};
        }
        var opt = {
            url: serviceURL + '/graph/entity/upsert/',
            headers: {
                "apiKey": this.apiKey,
                "contentType": "application/json"
            },
            method: "POST",
            json: data,

            timeout: timeout
        };
        return request(opt);
    },

    /**
     * Upserts the given entities.
     * @param {JSON} data A entity arrayin JSON format.
     * @returns {}
     */
    upsertEntities: function(obj) {
        var data;
        if(obj.entities) {
            data = obj;
        } else {
            data = {"entities": obj};
        }
        var opt = {
            url: serviceURL + '/graph/entity/upsertMany/',
            headers: {
                "apiKey": this.apiKey
            },
            method: "POST",
            json: data,

            timeout: timeout
        };
        return request(opt);
    },

    /**
     * Returns the entity with the given id.
     * @param {Guid} id An identifier.
     * @returns {}
     */
    getEntity: function(id) {
        var opt = {
            url: serviceURL + '/graph/entity/get/' + id,

            headers: {
                "apiKey": this.apiKey
            },
            method: "GET",
            json: true,
            timeout: timeout
        };
        return request(opt);
    },

    /**
     * Returns the entities with the given ids.
     * @param {Array} ids An array of identifiers.
     * @returns {}
     */
    getEntities: function(obj) {
        var data;
        if(obj.ids) {
            data = obj;
        } else {
            data = {"ids": obj};
        }
        var opt = {
            url: serviceURL + '/graph/entity/getMany/',
            json: data,

            headers: {
                "apiKey": this.apiKey
            },
            method: "POST",
            timeout: timeout
        };
        return request(opt);
    },

    /**
     * Deletes the entity with the given id.
     * @param {Guid} id An identifier.
     * @returns {bool} True if the entity was deleted.
     */
    deleteEntity: function(id) {
        var opt = {
            url: serviceURL + '/graph/entity/delete/',
            qs: {id: id},
            headers: {
                "apiKey": this.apiKey
            },
            method: "GET",
            timeout: timeout
        };
        return request(opt);
    },

    /**
     * Connects the entities with the given identifiers.
     * @param {Guid} fromId Source id.
     * @param {Guid} toId Target id.
     * @param {String} title A semantic label for the link.
     * @returns {Guid} The id of the created link.
     */
    linkEntities: function(fromId, toId, title) {
        var opt = {
            url: serviceURL + '/graph/link/',
            data: {fromId: fromId, toId: toId, title: title || ''},

            headers: {
                "apiKey": this.apiKey
            },
            method: "GET",
            timeout: timeout
        };
        return request(opt);
    },

    /***
     * An alias for linkEntities.
     * @param {Guid} fromId Source id.
     * @param {Guid} toId Target id.
     * @param {String} title A semantic label for the link.
     * @returns {Guid} The id of the created link.
     */
    connect: function(fromId, toId, title) {
        return Qwiery.linkEntities(fromId, toId, title);
    },

    /**
     * Disconnects the entities with the given identifiers.
     * @param {Guid} fromId Source id.
     * @param {Guid} toId Target id.
     */
    unlinkEntities: function(fromId, toId, title) {
        var opt = {
            url: serviceURL + '/graph/unlink/',
            data: {fromId: fromId, toId: toId, title: title},

            headers: {
                "apiKey": this.apiKey
            },
            method: "GET",
            timeout: timeout
        };
        return request(opt);
    },

    /***
     * An alias for unlinkEntities.
     * @param fromId
     * @param toId
     * @returns {*}
     */
    disconnect: function(fromId, toId) {
        return Qwiery.unlinkEntities(fromId, toId);
    },

    /**
     * Returns the related nodes to the given one.
     * @param {Guid} id An identifier.
     * @returns {}
     */
    getRelated: function(id) {
        var opt = {
            url: serviceURL + '/graph/entity/related/',
            data: {id: id},

            headers: {
                "apiKey": this.apiKey
            },
            method: "GET",
            timeout: timeout
        };
        return request(opt);
    },

    /**
     * Returns some recently created entities.
     * @returns {}
     */
    getRecentEntities: function() {
        var opt = {
            url: serviceURL + '/graph/entities/recent',

            headers: {
                "apiKey": this.apiKey
            },
            method: "GET",
            timeout: timeout
        };
        return request(opt);
    },

    /**
     * Returns the tags of an entity.
     * @returns {}
     */
    getEntityTags: function(id) {
        var opt = {
            url: serviceURL + '/graph/entity/tags/' + id,

            headers: {
                "apiKey": this.apiKey
            },
            method: "GET",
            timeout: timeout
        };
        return request(opt);
    },
    //</editor-fold>

    // <editor-fold desc="Language">
    /**
     * Fetches the sentiments contained in the given text.
     * @param text The text to analyze.
     * @returns {Promise}
     */
    getSentiment: function(text) {
        var opt = {
            url: serviceURL + '/language/sentiment/',
            json: {text: text},
            headers: {
                "apiKey": this.apiKey
            },
            method: "POST",
            timeout: timeout
        };
        return request(opt);
    },
    // </editor-fold>

    // <editor-fold desc="Utils">

    /***
     * Returns the current version of Qwiery.
     * @returns {Promise}
     */
    ping: function() {
        var that = this;
        return new Promise(function(resolve, reject) {
            var body = [];
            var url = serviceURL + "/api/test";
            var lib = url.startsWith('https') ? require('https') : require('http');
            var opt = {
                host: 'api.qwiery.com',
                path: '/api/test',
                headers: {
                    'apiKey': that.apiKey
                }
            };
            var req = lib.get(opt, function(response) {
                if(response.statusCode < 200 || response.statusCode > 299) {
                    reject(new Error('Failed to load page, status code: ' + response.statusCode));
                }
                response.on('data',
                    function(chunk) {
                        body.push(chunk);
                    });
                response.on('end',
                    function() {
                        resolve(body.join(''));
                    }
                );
            });
            req.on('error', function(err) {
                reject(err);
            });

        });


    },

    /**
     * Returns true if the given object is not undefined and not null.
     * @param obj Any object.
     * @returns {boolean}
     */
    isDefined: function(obj) {
        return obj !== undefined && obj !== null;
    },

    /**
     * Returns true if the given object is undefined or null.
     * @param obj Any object.
     * @returns {boolean}
     */
    isUndefined: function(obj) {
        return !Qwiery.isDefined(obj);
    },

    /**
     * Returns a random identifier which can be used as an ID of objects, eventually augmented with a prefix.
     * @returns {string}
     */
    randomId: function(length) {
        if(length === undefined) {
            length = 10;
        }
        // old version return Math.floor((1 + Math.random()) * 0x1000000).toString(16).substring(1);
        var result = "";
        var chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        for(var i = length; i > 0; --i) {
            result += chars.charAt(Math.round(Math.random() * (chars.length - 1)));
        }
        return result;
    },

    /**
     Returns a random guid.
     */
    guid: function() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }

        return s4() + s4() + "-" + s4() + "-" + s4() + "-" +
            s4() + "-" + s4() + s4() + s4();
    },
    // </editor-fold>
};
