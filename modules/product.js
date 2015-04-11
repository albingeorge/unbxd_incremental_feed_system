// Imports
var redis_client = require("../redis_client")["redisClient"];
var key_manager = require("../models/key_management");


// var product = new Product("site_name", {"uniqueId": "AB001", "stock": "5"}, function() {
//     product.push();
// });

var status_codes = {
    "UNIQUEID_MISSING": -1,
    "SUCCESS": 1
};

var Product = function(site_name, product, cb) {
    this.site_name = site_name;
    this.product = product;
    this.uniqueId = "";


    /**
    * Check if the product has uniqueId
    */
    var validate_product = function(current) {
        if("uniqueId" in product) {
            current.uniqueId = product["uniqueId"];
            return status_codes["UNIQUEID_MISSING"];
        }
        return status_codes["UNIQUEID_MISSING"];
    }

    /*
    * If a product with the same uniqueId exists in redis,
    *   merge the data in both redis and from the request,
    *   overwriting the values in redis with the ones in request
    */
    var build_product = function(current) {
        redis_client.hget("product:" + site_name, current.uniqueId, function(err, value) {
            var redis_product = {};
            if(value != null) {
                redis_product = JSON.parse(value);
            }

            // Merge the products from redis and request
            for(var attr in current.product) {
                redis_product[attr] = current.product[attr];
            }

            current.product = redis_product;
            cb();
        });
    }

    if(!(validate_product(this))) {
        return false;
    }

    // Do we really need this?
    // build_product(this);

    this.push = function() {
        key_manager.set_key_products(this.site_name, this.uniqueId);
        redis_client.hset("product:" + site_name, this.uniqueId, JSON.stringify(this.product));
    }
}

module.exports = {
    "Product": Product,
    "status_codes": status_codes
}