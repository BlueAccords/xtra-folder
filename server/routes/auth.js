const Router = require('koa-router');
const queries = require('../db/queries/user');
const passport = require('koa-passport');

const router = new Router();
const BASE_URL = `/api/auth`;

// registers a new user and logins them in
router.post(`${BASE_URL}/register`, async (ctx) => {
  const user = await queries.addUser(ctx.request.body);
  // console.log(user);
  return passport.authenticate('local', (err, user, info, status) => {
    if(err) {
      ctx.status = 400;
      ctx.body = {
        status: 'error',
        message: err || 'something went wrong'
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
        message: 'something went wrong'
      };
    }
  })(ctx);
});

module.exports = router;