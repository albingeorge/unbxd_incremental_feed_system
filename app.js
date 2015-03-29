// Imports
var app = require("express")();
var body_parser = require('body-parser');
var key_management = require("./handlers/key_management")
var authenticate = require("./handlers/authenticate")
var validate = require("./handlers/validate")

// Used to manage inputs in requests
app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());


// Routes

// Validate the data and then authenticate each request
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


// Sets the secret key
// If a key already exists, validate that key from redis before changing the secret key
app.post("/incremental-feed-upload/set-secret-key/:site_name/:secret_key?", key_management.set_secret_key);



// Listen to port 3000
app.listen(3000);