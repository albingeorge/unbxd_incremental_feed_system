// Imports
var redis_client = require("../redis_client")["redisClient"];
var collect_data = require("../modules/collect_data");
var key_management = require("../modules/key_management");


var push_single_product = function(req, res, next) {
    /*
    Here we assume that the body itself contain a product. Might change this later.
    */
    console.log(collect_data);
    collect_data.add_product(req.params.site_name, req.body);
    res.send("Success");
}

module.exports = {
    "push": push_single_product
}