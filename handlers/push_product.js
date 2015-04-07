// Imports
var product = require("../modules/product");

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