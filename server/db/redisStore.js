require('dotenv').config();
const session = require('express-session');
const redisStore = require('connect-redis')(session);
const redis = require('redis');
const client = redis.createClient();
let redisConfig = require('./../../redisConfig')[process.env.NODE_ENV || 'development'];

const redisConfigConcated = Object.assign(
  redisConfig,
  {
    client: client
  });



module.exports = new redisStore(redisConfigConcated);
