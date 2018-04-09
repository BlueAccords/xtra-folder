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
            ctrlHelpers.handleResponse(true, res, successCode, successMsg);
          });
        } else if(info) {
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
      ctrlHelpers.handleResponse(true, res, 200, 'successfully logged out');
    } else {
      ctrlHelpers.handleResponse(true, res, 403, 'no user is currently logged in');
    }
  }
}