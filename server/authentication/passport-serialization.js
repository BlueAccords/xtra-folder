const passport = require('passport');
const knex = require('../db/connection');

module.exports = function() {
  // requires serialization/deserialization of user info
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    return knex.select('id', 'email', 'username', 'role').from('user').where({id}).first()
      .then((user) => { 
        done(null, user);
      })
      .catch((err) => { 
        done(err,null); 
    });
  });
}

