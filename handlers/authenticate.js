var redisClient = require("../redis_client")["redisClient"];

var authorize = function(req, res, next) {
    redisClient.hget('secret_key', req.params.site_name, function(err, value) {
        if("secret_key" in req.params && value == req.params.secret_key) {
            console.log("Authentication success");
            next();
        } else {
            res.status(403).send("Authentication failure");
        }
    });
}

/*
    If secret key exists for a particular site, compare the secret keys given and the ones in redis
    Else, pass
*/
var authorize_if_exists = function(req, res, next) {
    console.log("Authentication");
    redisClient.hget('secret_key', req.params.site_name, function(err, value) {
        if(value == null) {
            console.log("No secret key set for the given site");
            next();
        } else {
            console.log("Secret key set for the given site");
            if("secret_key" in req.params && value == req.params.secret_key) {
                console.log("Auth success");
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