const environment = process.env.NODE_ENV || 'development';
const config = require.main.require('knexfile.js')[environment];

module.exports = require('knex')(config)
