// Imports
var redis_client = require("../redis_client")["redisClient"];


/*

Examples:

var config = new Configuration("site_name", function() {
    config.set_config("interval", "15");
    config.set_config("some_other_config", "value");
    config.save();
});


var config = configuration("site_name");
var interval = config.get("interval");

*/


// The configuration object
var Configuration = function(site_name, cb) {

    // private variables and methods
    this.site_name = site_name;

    // for validating a config field
    var allowed_configs = ["interval", "datastore"];

    var this_config = this.config = {"datastore": "ds_1"};


    var get_current_config = function(self) {
        console.log(self.config);
        redis_client.hget("configs", site_name, function(err, config) {
            if(config != null) {
                this_config = JSON.parse(config);
            }
            console.log("Current configuration:");
            console.log(this_config);
            cb();
        });
    }

    get_current_config(this);

    this.set_config = function(config_key, value) {
        console.log("Setting config");
        console.log(config_key+":" + value);
        if(validate_config(config_key, value)) {
            this_config[config_key] = value;
            console.log("Config Now:");
            console.log(this_config);
            return true;
        }
        return false;
    }

    this.save = function() {
        console.log(JSON.stringify(this_config));
        return redis_client.hset("configs", this.site_name, JSON.stringify(this_config));
    }

    this.get = function(config_key) {
        if(config_key in this_config) {
            return this_config.config_key;
        }
        return false;
    }

    var validate_config = function(config_key, value) {
        // If the config key is valid
        if(allowed_configs.indexOf(config_key) >= 0) {
            console.log("Validation success");
            return true;
        }
        console.log("Validation failed");
        return false;
    }
}


module.exports = {
    "configuration": Configuration
}