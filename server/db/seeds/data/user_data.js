const bcrypt = require('bcryptjs');

module.exports = [
  {
    email: 'ro1email@gmail.com',
    password_digest: hashPassword('password111'),
    username: 'ro1username',
    role: 'standard'
  },
  {
    email: 'ro2email@gmail.com',
    password_digest: hashPassword('password111'),
    username: 'ro2username',
    role: 'moderator'
  },
  {
    email: 'ro3email@gmail.com',
    password_digest: hashPassword('password111'),
    username: 'ro3username',
    role: 'admin'
  },
];

function hashPassword(password) {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(password, salt);

  return hash;
}