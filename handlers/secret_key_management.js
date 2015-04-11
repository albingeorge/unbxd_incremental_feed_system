var key_manager = require("../models/key_management");
var Configuration = require("../modules/configuration")["configuration"];

function set_secret_key(req, res, next) {
    if("secret_key" in req.body && req.body.secret_key) {
        key_manager.set_secret_key(req.params.site_name, req.body.secret_key);
        key_manager.set_key_site_name(req.params.site_name);

        var config = new Configuration(req.params.site_name, function() {
        config.set_config("datastore", "ds_1");
        config.save();
        res.status(200).send("Success");
    });

        res.status(200).send("Secret key updated");
    } else {
        res.status(400).send("No secret key available to update");
    }
}


module.exports = {
    "set_secret_key": set_secret_key
}