var config = require("./config");
var redis = require('redis');
var redisClient = redis.createClient();
if("password" in config.redis && config.redis.password) {
    redisClient.auth(config.redis.password);
}
redisClient.on('connect', function() {
    console.log('Redis connected');
});
module.exports = {
    "redisClient": redisClient
}