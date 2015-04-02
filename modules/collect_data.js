var redisClient = require("../redis_client")["redisClient"];

/*
    1. Check if for the given site, an entry exists for the same uniqueId
        1. Modify those values with the ones sent in the latest request
    2. Create a new entry for the given uniqueId in the given site
*/

var status_codes = {
    "UNIQUEID_MISSING": -1,
    "SUCCESS": 1
}

function is_valid_product(product) {
    if("uniqueId" in product) {
        return true;
    }
    return false;
}

var add_product = function(site_name, product) {
    /*
        Key => product:<site_name>:<uniqueId>:<fieldName>
        product:site_name:AB0001:uniqueId
    */
    console.log("Check if valid product");
    if(is_valid_product(product)) {
        console.log("Adding product:");
        console.log(product);
        for(fieldName in product) {
            redisClient.set("product:" + site_name + ":" + product["uniqueId"] + ":" + fieldName, product[fieldName]);
        }
        return status_codes.SUCCESS;
    } else {
        return status_codes.UNIQUEID_MISSING;
    }


}

module.exports = {
    "status_codes": status_codes,
    "add_product": add_product
}