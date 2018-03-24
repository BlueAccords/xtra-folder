const knex = require.main.require('server/db/connection');

function getAllUsers() {
  return knex('user')
    .select('*');
}

function getSingleUser(id) {
  return knex('user')
    .where('id', parseInt(id))
    .select('*');
}


module.exports = {
  getAllUsers,
  getSingleUser
};