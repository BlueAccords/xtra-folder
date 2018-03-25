const passport = require('koa-passport');
const knex = require('../db/connection');

const options = {};


// strategies
const LocalStrategy = require('passport-local').Strategy;





passport.serializeUser((user, done) => {
   done(null, user.id);
});

passport.deserializeUser((id, done) => {
  return knex('user').where({id}).first()
  .then((user) => { done(null, user); })
  .catch((err) => { done(err,null); });
});

passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password_digest'
}, (username, password, done) => {

  knex('user').where({ username }).first()
    .then((user) => {
      if (!user) {
        return done(null, false, 'user with that username does not exist');
      }
      if (password === user.password_digest) {
        return done(null, user, 'success');
      } else {
        return done(null, false, 'passwords do not match');
      }
    })
    .catch((err) => { return done(err); });
}));
