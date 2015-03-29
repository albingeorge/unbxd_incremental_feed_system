var redisClient = require("../redis_client")["redisClient"];

var authorize = function(req, res, next) {
    redisClient.get('secret_key:' + req.params.site_name, function(err, value) {
        if("secret_key" in req.params && value == req.params.secret_key) {
            console.log("Authentication success");
            next();
        } else {
            res.status(403).send("Authentication failure");
        }
    });
}

/*
    If secret key exists for a particular site, authorize it and then set the new secret key
    Else, just set the secret key
*/
var authorize_if_exists = function(req, res, next) {
    redisClient.get('secret_key:' + req.params.site_name, function(err, value) {
        if(value == null) {
            next();
        } else {
            if("secret_key" in req.params && value == req.params.secret_key) {
                next();
            } else {
                res.status(403).send("Authentication failure");
            }
        }
    });
}

module.exports = {
    "authorize": authorize,
    "authorize_if_exists": authorize_if_exists
}