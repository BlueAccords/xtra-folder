const passport = require('koa-passport');
const knex = require('../db/connection');
const bcrypt = require('bcryptjs');

const options = {};


// strategies
const LocalStrategy = require('passport-local').Strategy;




function comparePassword(userPassword, dbPassword) {
  return bcrypt.compareSync(userPassword, dbPassword);
}

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  return knex('user').where({id}).first()
    .then((user) => { 
      done(null, user);
    })
    .catch((err) => { 
      done(err,null); 
  });
});

// local strategy, for db backed username/password
passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password_digest'
}, (username, password, done) => {

  knex('user').where({ username }).first()
    .then((user) => {
      // check if user with username exists
      if (!user) {
        return done(null, false, 'user with that username does not exist');
      }

      // else check if hashed passwords are the same
      if(comparePassword(password, user.password_digest)) {
        return done(null, user, 'success');
      } else {
        return done(null, false, 'passwords do not match');
      }
    })
    .catch((err) => { return done(err); });
}));
