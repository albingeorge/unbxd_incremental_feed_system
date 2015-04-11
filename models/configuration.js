var redis_client = require("../redis_client")["redisClient"];

var get_config = function(site_name, cb) {
    redis_client.hget("configs", site_name, function(err, config) {
        var current_config = {};
        if(config != null) {
            current_config = JSON.parse(config);
        }
        cb(current_config);
    });
}

var set_config = function(site_name, config) {
    return redis_client.hset("configs", site_name, JSON.stringify(config));
}

module.exports = {
    "get_current_configuration": get_config,
    "set_configuration": set_config
};