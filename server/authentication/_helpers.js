const bcrypt = require('bcryptjs');

// helper functions
function comparePassword(userPassword, dbPassword) {
  return bcrypt.compareSync(userPassword, dbPassword);
}

module.exports = {
  comparePassword
}