var authenticate = require("../models/authenticate");

var authorize = function(req, res, next) {
    type = req.path.split("/")[2];
    var strict = {
        "configuration": true,
        "set-secret-key": false,
        "push-product": true,
        "feed-upload": true
    }
    authenticate.authorize(req.params.site_name, req.params, strict[type], function(auth) {
        if(auth == authenticate.status_codes["AUTH_SUCCESS"]) {
            next();
        } else {
            res.status(403).json({"status": "authentication failed"});
        }
    });
}

module.exports = {
    "authorize": authorize
}