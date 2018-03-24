const knex = require.main.require('server/db/connection');

function getAllUsers() {
  return knex('user')
    .select('*');
}

module.exports = {
  getAllUsers
};