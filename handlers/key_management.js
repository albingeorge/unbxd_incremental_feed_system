var redis_client = require("../redis_client")["redisClient"];
function set_secret_key(req, res, next) {
    if("secret_key" in req.body && req.body.secret_key) {
        redis_client.hset("secret_key", req.params.site_name, req.body.secret_key);
        res.status(200).send("Secret key updated");
    } else {
        res.status(400).send("No secret key available to update");
    }
}


/*
Redis keys structure:

site_names = ["site_name_1", "site_name_2"]
products:site_name = [
    "AB001",
    "AB002"
]

*/
var set_key_site_name = function(site_name) {
    if(!(redis_client.sismember("site_names", site_name))) {
        redis_client.sadd("site_names", site_name);
    }
}

var set_key_products = function(site_name, unique_id) {
    if(!(redis_client.sismember("products:" + site_name, unique_id))) {
        redis_client.sadd("products:" + site_name, unique_id);
    }
}

var get_all_sites = function() {
    return redis_client.smembers("site_names");
}

var get_all_products_from_site = function(site_name) {
    return redis_client.smembers("products:" + site_name);
}

module.exports = {
    "set_secret_key": set_secret_key,
    "set_key_site_name": set_key_site_name,
    "set_key_products": set_key_products,
    "get_all_sites": get_all_sites,
    "get_all_products_from_site": get_all_products_from_site
}