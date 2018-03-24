const knex = require('../connection');

function getAllUsers() {
  return knex('user')
    .select('id', 'email', 'username', 'role', 'created_at');
}

function getSingleUser(id) {
  return knex('user')
    .where('id', parseInt(id))
    .select('id', 'email', 'username', 'role', 'created_at');
}


module.exports = {
  getAllUsers,
  getSingleUser
};