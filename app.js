var app = require("express")();
var bodyParser = require('body-parser');
var key_management = require("./handlers/key_management")
var authenticate = require("./handlers/authenticate")
var validate = require("./handlers/validate")

// Require redis and create a redis client object with the default hostname(127.0.0.1) and port(6379)

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());


app.post(
    [
        "/incremental-feed-upload/set-secret-key/:site_name/:secret_key?",
        "/incremental-feed-upload/configuration/:site_name/:secret_key"
    ],
    validate.validate,
    authenticate.authorize_if_exists
);

app.post(
    "/incremental-feed-upload/send-data/:site_name/:site_secret_key/:secret_key",
    validate.validate,
    authenticate.authorize
);





app.post("/incremental-feed-upload/set-secret-key/:site_name/:secret_key?", key_management.set_secret_key);

app.post("/incremental-feed-upload/configuration/:site_name/:secret_key", function(req, res) {
    var credentials = req.query;
    console.log(credentials);
    return res.json(req.query);
});



app.listen(3000);