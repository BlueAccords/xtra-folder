// redis config settings
var dotenv = require('dotenv').config();
const path = require('path');
const BASE_PATH = path.join(__dirname, 'server', 'db');

module.exports = {
  development: {
    host: 'local',
    port: 6379,
  },
  test: {
    host: 'local',
    port: 6379,
  },
  production: {
    host: 'local',
    port: 6379,
  }
};
