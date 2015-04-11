// Imports
var Configuration = require("../modules/configuration")["configuration"];


var set_configuration_handler = function(req, res, next) {
    // Push the config for the site to redis and send status as success
    var config = new Configuration(req.params.site_name, function() {
        for (key in req.body) {
            config.set_config(key, req.body[key]);
        }
        if(config.save()) {
            res.status(200).json({"status": "success"});
        } else {
            res.status(400).json({"status": "failed", "invalid config fields": config.errors["validation"]});
        }
    });
}



module.exports = {
    "set": set_configuration_handler
}