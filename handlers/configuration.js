// Imports
var redis_client = require("../redis_client")["redisClient"];


var configuration = function(req, res, next) {
    if(validate_config_elements(req.body)) {
        // Push the config for the site to redis and send status as success
        res.status(200).send("Success");
    }
    res.status(400).send("Invalid config elements sent");
}

function validate_config_elements(body) {
    var config_elements = ["interval"];
    var config = req.body;
    for(key in config) {
        if(!(key in config_elements)) {
            return false;
        }
    }
    return true;
}