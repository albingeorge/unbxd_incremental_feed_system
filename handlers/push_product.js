// Imports
var redis_client = require("../redis_client")["redisClient"];
var product = require("../modules/product");
var key_management = require("../modules/key_management");


var push_single_product = function(req, res, next) {
    /*
    Here we assume that the body itself contain a product. Might change this later.
    */

    var prod = new product.Product(req.params.site_name, req.body, function() {
        prod.push();
    });
    res.send("Success");
}

module.exports = {
    "push": push_single_product
}