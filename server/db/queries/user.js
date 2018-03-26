const knex = require('../connection');
const bcrypt = require('bcryptjs');

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
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(user.password_digest, salt);
  return knex('user')
    .insert({
      username: user.username,
      email: user.email,
      password_digest: hash,
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