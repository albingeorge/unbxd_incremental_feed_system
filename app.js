// Imports
var app = require("express")();
var body_parser = require('body-parser');
var secret_key_management = require("./handlers/secret_key_management")
var configuration = require("./handlers/configuration")
var push_product = require("./handlers/push_product")
var authenticate = require("./handlers/authenticate")
var validate = require("./handlers/validate")

// Used to manage inputs in requests
app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());


// ROUTES

// Validate the data and then authenticate each request
app.post(
    [
        "/incremental-feed-upload/set-secret-key/:site_name/:secret_key?"
    ],
    validate.validate,
    authenticate.authorize_if_exists
);

app.post(
    [
        "/incremental-feed-upload/configuration/:site_name/:secret_key",
        "/incremental-feed-upload/push-product/:site_name/:site_secret_key/:secret_key",
        "/incremental-feed-upload/feed-upload/:site_name/:site_secret_key/:secret_key"
    ],
    validate.validate,
    authenticate.authorize
);

app.post(
    "/incremental-feed-upload/push-product/:site_name/:site_secret_key/:secret_key",
    // Send the data to be added to redis
    push_product.push
);

app.post(
    "/incremental-feed-upload/feed-upload/:site_name/:site_secret_key/:secret_key",
    // Send the data to be added to redis
    push_product.push
);


/*
    Sets the secret key
    If a key already exists, validate that key from redis before changing the secret key
*/
app.post("/incremental-feed-upload/set-secret-key/:site_name/:secret_key?", secret_key_management.set_secret_key);


/*
    Set the configuration
*/
app.post("/incremental-feed-upload/configuration/:site_name/:secret_key", configuration.set);





// Listen to port 3000
app.listen(3000);