var _config = require('../config/config');


var Connector = {
    _redis: null,

    /**
     * @return {null}
     */
    Redis: function () {
        if(Connector._redis == null){
            var redis = require('redis');
            Connector._redis = redis.createClient(6380, "wml.redis.cache.windows.net", 
                    {auth_pass: "LLnjNDPxHs7FrGVV3hzWzQKpy6GWv45S0lF9pP2dMNU=", tls: {servername: "wml.redis.cache.windows.net"}});
        }
        return Connector._redis;
    }
};


module.exports = Connector;