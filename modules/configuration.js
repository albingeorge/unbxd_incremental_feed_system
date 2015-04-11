// Imports
var config = require("../models/configuration");


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

    var this_errors = this.errors = {"validation": []}


    var get_current_config = function(self) {
        // Get the current config via model
        config.get_current_configuration(site_name, function(current_config) {
            this_config = current_config;
            cb();
        });
    }

    get_current_config(this);

    this.set_config = function(config_key, value) {
        if(validate_config(config_key, value)) {
            this_config[config_key] = value;
            return true;
        }
        return false;
    }

    this.swap_data_store = function() {
        this_config["datastore"] = ("datastore" in this_config && this_config["datastore"] == "ds_1") ? "ds_2" : "ds_1";
    }

    this.save = function() {
        if(!errors_exist()) {
            return config.set_configuration(this.site_name, this_config);
        } else {
            return false;
        }
    }

    this.get = function(config_key) {
        if(config_key in this_config) {
            return this_config.config_key;
        }
        return false;
    }

    var errors_exist = function() {
        return (this_errors["validation"].length > 0);
    }

    var validate_config = function(config_key, value) {
        // If the config key is valid
        if(allowed_configs.indexOf(config_key) >= 0) {
            return true;
        }
        this_errors['validation'].push(config_key);
        return false;
    }
}


module.exports = {
    "configuration": Configuration
}