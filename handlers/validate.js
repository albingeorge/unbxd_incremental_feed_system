var validate = function(req, res, next) {
    var requirements = {
        "configuration": [
            "site_name",
            "secret_key"
        ],
        // does not require a secret key if it's a new site
        // consider the minimal values here
        "set-secret-key": [
            "site_name"
        ],
        "send-data": [
            "site_name",
            "secret_key",
            "site_secret_key"
        ]
    };

    type = req.path.split("/")[2];
    console.log(type);

    if(type in requirements) {
        for (var i = 0; i < requirements[type].length; i++) {
            if(!(requirements[type][i] in req.params)) {
                res.status("400").send("Validation Failed");
            }
        };
    }
    next();
}



module.exports = {
    "validate": validate
}