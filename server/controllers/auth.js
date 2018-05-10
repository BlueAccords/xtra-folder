const express = require('express');
const Router = express.Router();
const passport = require('passport');
const Boom = require('boom');
const ctrlHelpers = require('./_helpers');

// model
const Person = require('../models/user');

// const router = new Router();
const BASE_URL = `/api/auth`;



// async/await compatible version of passport
// source: https://stackoverflow.com/questions/42382498/how-to-get-passport-authenticate-local-strategy-working-with-async-await-pattern
function __promisifiedPassportAuthentication(req, res, successMsg, successCode) {
  return new Promise((resolve, reject) => {
      passport.authenticate('local', (err, user, info) => {

        if(err) {
          reject(Boom.badImplementation(err));
        }
        if (user) {
          req.login(user, function(err) {
            if(err){
              reject(Boom.badRequest(err));
            }

            let cleanedUser = user;
            delete cleanedUser.password_digest;
            delete cleanedUser.role;
            delete cleanedUser.created_at;
            ctrlHelpers.handleResponse(true, res, successCode, successMsg, cleanedUser);
          });
        } else if(info) {
          // TODO: add better handling here to tell user api request was formatted wrong, maybe use joi
          reject(Boom.badRequest(info));
        } else {
          reject(Boom.badImplementation('Encountered an error while logging in user'));
        }
      })(req, res)
  })
};

module.exports = {
  // POST#register
  // registers and logins a new user
  register: async function(req, res) {
    const user = await Person
      .query()
      .insert(req.body);
    
    await __promisifiedPassportAuthentication(req, res, 'successfully registered and logged in', 201);
  },

  // POST#logout
  login: async function(req, res) {
    await __promisifiedPassportAuthentication(req, res, 'successfully logged in', 200);
  },
  logout: async function(req, res) {
    if(req.isAuthenticated()) {
      req.logout();
      req.session.destroy((err) => {
        if (!err) {
          ctrlHelpers.clearCookie(res, 'connect.sid', '/');
          ctrlHelpers.handleResponse(true, res, 200, 'successfully logged out');
        } else {
          throw Boom.internal('Failed to logout user or user session no longer exists.');
        }
      })
    } else {
      ctrlHelpers.handleResponse(false, res, 400, 'No user is currently logged in');
    }
  },
  // used to check if client has a session cookie and if it is validate.
  validateSession: async function(req, res) {
    console.log(req.user);
    console.log(req.isAuthenticated());
    if(req.user && req.isAuthenticated()) {
      ctrlHelpers.handleResponse(true, res, 200, 'success', req.user);
    } else {
      throw Boom.badRequest('User is not logged in');
    }
  }
}