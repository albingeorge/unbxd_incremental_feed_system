var redis_client = require("../redis_client")["redisClient"];

/*
Redis keys structure:

keys:site_names = ["site_name_1", "site_name_2"]
keys:products:site_name_1 = [
    "AB001",
    "AB002"
]

*/
var set_key_site_name = function(site_name) {
    redis_client.sadd(["keys:site_names", site_name]);
}

var set_key_products = function(site_name, unique_id) {
    redis_client.sadd(["keys:products:" + site_name, unique_id]);
}

var get_all_sites = function() {
    return redis_client.smembers("keys:site_names");
}

var get_all_products_from_site = function(site_name) {
    return redis_client.smembers("keys:products:" + site_name);
}

var set_secret_key = function(site_name, secret_name) {
    redis_client.hset("secret_key", req.params.site_name, req.body.secret_key);
}

module.exports = {
    "set_key_site_name": set_key_site_name,
    "set_key_products": set_key_products,
    "get_all_sites": get_all_sites,
    "get_all_products_from_site": get_all_products_from_site,
    "set_secret_key": set_secret_key
}