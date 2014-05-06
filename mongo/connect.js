var mongoPool = {};

exports.connect = function(port, ip, dbname, callback) {
    var name = port + ip;
    if (typeof(port) == 'function') {
        callback = port;
        port = 27017;
        ip = "127.0.0.1";
        dbname = "zhuwenlong";
    }

    if (typeof(dbname) == 'function') {
        callback = dbname;
        dbname = "zhuwenlong";
    }


    if (mongoPool[name]) {
        if (callback) callback(mongoPool[name].db);
    } else {
        mongoPool[name] = mongoPool[name] || {};
        mongoPool[name].stack = mongoPool[name].stack || [];
        mongoPool[name].stack.push(callback);
        if (mongoPool[name].stat !== 'ing') {
            mongoPool[name].stat = 'ing';
            var MongoClient = require('mongodb').MongoClient;
            MongoClient.connect('mongodb://' + ip + ':' + port + '/' + dbname, function(err, db) {
                db.authenticate("zhuwenlong", "123123", function() {
                    mongoPool[name].db = db;
                    while (mongoPool[name].stack.length > 0) {
                        mongoPool[name].stack.shift()(db);
                    }
                });
            });
        }
    }
};