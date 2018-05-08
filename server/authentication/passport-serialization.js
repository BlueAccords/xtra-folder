const passport = require('passport');
const knex = require('../db/connection');

module.exports = function() {
  // requires serialization/deserialization of user info
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // NOTE: if user is deleted while they have a session active in redis db they will have to have their session
  // deleted from the redis store manually
  passport.deserializeUser((id, done) => {
    return knex.select('id', 'email', 'username', 'role').from('user').where({id}).first()
      .then((user) => { 
        if(user) {
          done(null, user);
        } else {
          throw new Error('User not found while trying to verify user session. Please Try again.');
        }
      })
      .catch((err) => { 
        done(err, undefined); 
    });
  });
}

