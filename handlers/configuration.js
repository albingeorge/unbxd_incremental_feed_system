// Imports
var redis_client = require("../redis_client")["redisClient"];
var Configuration = require("../modules/configuration")["configuration"];


var set_configuration_handler = function(req, res, next) {
    // Push the config for the site to redis and send status as success
    // console.log("Setting config for site " + req.params.site_name);
    var config = new Configuration(req.params.site_name, function() {
        for (key in req.body) {
            if(config.set_config(key, req.body[key])) {
                console.log("Config set.")
            } else {
                console.log("Invalid config data.")
            }
        }
        console.log(config.save());
        res.status(200).send("Success");
    });

}



module.exports = {
    "set": set_configuration_handler
}