var redis_client = require("../redis_client")["redisClient"];

/*
Secret key storage format in redis:
    "secret_key": {
        "<site_name>": "<secret_key>"
    }
*/

var status_codes = {
    "AUTH_SUCCESS": 1,
    "AUTH_FAILURE": 0
}

/*
    strict - While setting a secret key initially,
    we do not need to check if a secret key already exists for the site.
    So, while setting the secret key, we pass the value  false to `strict`
*/
var authorize = function(site_name, params, strict, cb) {
    redis_client.hget('secret_key', site_name, function(err, value) {
        if(!strict && value == null) {
            cb(status_codes["AUTH_SUCCESS"]);
        } else {
            if("secret_key" in params && value == params.secret_key) {
                cb(status_codes["AUTH_SUCCESS"]);
            } else {
                cb(status_codes["AUTH_FAILURE"]);
            }
        }
    });
}

module.exports = {
    "status_codes": status_codes,
    "authorize": authorize
}