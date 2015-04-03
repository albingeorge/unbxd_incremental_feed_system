var redisClient = require("../redis_client")["redisClient"];

var dataCollection = {
    this.site_name = "";
    this.products = {};

    this.collect_from_redis = function(site_name) {
        this.site_name = site_name; 
        // Logic to collect the product data from redis goes here
        // Set the value for this.products
    }

}


var dump_data_from_redis = function(site_name) {
    return data_collection;
}
