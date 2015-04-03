var redis_client = require("../redis_client")["redisClient"];
function set_secret_key(req, res, next) {
    if("secret_key" in req.body && req.body.secret_key) {
        redis_client.hset("secret_key", req.params.site_name, req.body.secret_key);
        res.status(200).send("Secret key updated");
        // redis_client.set('secret_key:' + req.params.site_name, req.body.secret_key, function(err, value) {
        //     res.status(200).send("Secret key updated");
        // });
    } else {
        res.status(400).send("No secret key available to update");
    }
}

module.exports = {
    "set_secret_key": set_secret_key
}