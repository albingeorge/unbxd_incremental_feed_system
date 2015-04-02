// Imports
var redis_client = require("../redis_client")["redisClient"];


var set_configuration = function(req, res, next) {
    if(validate_config_elements(req.body)) {
        // Push the config for the site to redis and send status as success
        console.log("Setting config for site " + req.params.site_name);
        // Find a way to convert object to string
        for (key in req.body) {
            console.log("Key: " + "config:" + req.params.site_name + ":" + key);
            console.log("Value: " + req.body[key]);
            console.log();
            redis_client.set("config:" + req.params.site_name + ":" + key, req.body[key]);
        }
        res.status(200).send("Success");
    } else {
        res.status(400).send("Invalid config elements sent");
    }
}

function validate_config_elements(body) {
    var config_elements = ["interval"];
    console.log("keys in body");
    for(key in body) {
        console.log(key);
        if(config_elements.indexOf(key) == -1) {
            console.log(key + " not in allowed elements");
            return false;
        }
    }
    return true;
}
module.exports = {
    "set": set_configuration
}