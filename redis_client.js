// Imports
var config = require("./config");
var redis = require('redis');
var redisClient = redis.createClient();

// Require redis and create a redis client object with the default hostname(127.0.0.1) and port(6379)

// If password exist for redis in config authenticate redis with that password
if("password" in config.redis && config.redis.password) {
    redisClient.auth(config.redis.password);
}

// Connect to the server
redisClient.on('connect', function() {
    console.log('Redis connected');
});


module.exports = {
    "redisClient": redisClient
}