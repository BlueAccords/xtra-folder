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

function addUser(user) {
  return knex('user')
    .insert({
      username: user.username,
      email: user.email,
      password_digest: user.password_digest,
      // password_confirmation: user.password_confirmation,
    }).then((x) => {
      return knex('user')
        .where('username', user.username).first();
        // .select('id', 'email', 'username', 'role', 'created_at').first();
    });
}


module.exports = {
  getAllUsers,
  getSingleUser,
  addUser
};