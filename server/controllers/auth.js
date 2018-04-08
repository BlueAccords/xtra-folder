const express = require('express');
const Router = express.Router();
// const queries = require('../db/queries/user');
const passport = require('passport');

// model
const Person = require('../models/user');

// const router = new Router();
const BASE_URL = `/api/auth`;

function handleResponse(success, res, code, statusMsg) {
  res.status(code).json({
    success: success,
    data: statusMsg
  });
}

// async/await compatible version of passport
// source: https://stackoverflow.com/questions/42382498/how-to-get-passport-authenticate-local-strategy-working-with-async-await-pattern
function __promisifiedPassportAuthentication(req, res, successMsg, successCode) {
  return new Promise((resolve, reject) => {
      passport.authenticate('local', (err, user, info) => {
        if(err) {
          reject(err);
        }
        if (user) {
          req.login(user, function(err) {
            if(err) reject(err);
            handleResponse(true, res, successCode, successMsg);
          });
        } else if(info) {
          reject(info);
        } else {
          reject('Encountered an error while logging in user');
        }
      })(req, res)
  })
};

module.exports = {
  // POST#register
  // registers and logins a new user
  register: async function(req, res) {
    // const user = await queries.addUser(ctx.request.body);
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
      handleResponse(true, res, 200, 'successfully logged out');
    } else {
      handleResponse(true, res, 403, 'no user is currently logged in');
    }
  }
}