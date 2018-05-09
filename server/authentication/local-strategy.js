const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const knex = require('../db/connection');


const init = require('./passport-serialization');
const authHelpers = require('./_helpers');
const options = {};

init();



// local strategy, for db backed username/password
passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
}, (username, password, done) => {

  knex('user').where({ username }).first()
    .then((user) => {
      // check if user with username exists
      if (!user) {
        return done(null, false, 'user with that username does not exist');
      }

      // else check if hashed passwords are the same
      if(authHelpers.comparePassword(password, user.password_digest)) {
        return done(null, user, 'success');
      } else {
        return done(null, false, 'Invalid password');
      }
    })
    .catch((err) => { return done(err); });
}));

module.exports = passport;

