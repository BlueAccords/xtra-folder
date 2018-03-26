const Router = require('koa-router');
const queries = require('../db/queries/user');
const passport = require('koa-passport');

// model
const Person = require('../models/user');

const router = new Router();
const BASE_URL = `/api/auth`;

// POST#register
// registers a new user and logins them in
router.post(`${BASE_URL}/register`, async (ctx) => {
  // const user = await queries.addUser(ctx.request.body);
  // const user = {}
  // create new user
  try {
    const user = await Person
      .query()
      .insert(ctx.request.body);
  } catch(err) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: err || 'something went wrong'
    };
  }

  // authenticate/login user
  return passport.authenticate('local', (err, user, info, status) => {
    if(err) {
      ctx.status = 400;
      ctx.body = {
        status: 'error',
        message: info || 'something went wrong'
      };
    }
    if (user) {
      ctx.login(user);
      // ctx.redirect('/auth/status');
      ctx.status = 200;
      ctx.body = {
        status: 'success',
        message: 'successfully registered and logged in'
      };
    } else {
      ctx.status = 400;
      ctx.body = {
        status: 'error',
        message: info || 'something went wrong'
      };
    }
  })(ctx);
});


// POST#login
router.post(`${BASE_URL}/login`, async (ctx) => {
  return passport.authenticate('local', (err, user, info, status) => {
    // error checking
    if(err) {
      ctx.status = 400;
      ctx.body = {
        status: 'error',
        message: info || 'something went wrong'
      };
    }
    // successful path
    if(user) {
      ctx.login(user);
      ctx.status = 200;
      ctx.body = {
        status: 'success',
        message: 'successfully logged in'
      };
    } else {
      ctx.status = 400;
      ctx.body = {
        status: 'error',
        message: info || 'something went wrong'
      };
    }
  })(ctx);
});

// POST#logout
router.get(`${BASE_URL}/logout`, async (ctx) => {
  if (ctx.isAuthenticated()) {
    ctx.logout();
    ctx.body = {
      status: 'success',
      message: 'successfully logged out'
    }
  } else {
    ctx.body = { 
      success: false 
    };
    ctx.throw(401, 'failed to logout');
  }
})

module.exports = router;