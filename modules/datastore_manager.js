// Imports
var redis_client = require("../redis_client")["redisClient"];

var DatastoreManager = function(site_name, cb) {

    this.site_name = site_name;
    var this_datastore = this.datastore = get_current_datastore();

    var get_current_datastore = function() {
        redis_client.hget("config", site_name, function(err, config) {
            var config = JSON.parse(config);
            if("datastore" in config) {
                this_datastore = config["datastore"];
            } else {
                this_datastore = "1";
            }
            cb();
        });
    }

    var is_valid_datastore(datastore) {
        if(datastore === "1" || datastore === "2") {
            return true;
        }
        return false;
    }

    this.set_datastore = function(datastore) {
        if(is_valid_datastore(datastore)) {
            this_datastore = datastore;
        }
        return this;
    }

    this.change_datastore() {
        this_datastore = (this_datastore === "1")?"2":"1";
        this.save();
        return this;
    }

    this.save = function() {
        redis_client.hset("config", site_name, datastore);
    }
}