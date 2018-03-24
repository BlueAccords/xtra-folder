const Router = require('koa-router');
const queries = require('../db/queries/user');

const router = new Router();
const BASE_URL = `/api/user`;

router.get(BASE_URL, async (ctx) => {
  try {
    const users = await queries.getAllUsers();
    ctx.body = {
      status: 'success',
      data: users
    };
  } catch (err) {
    console.log(err)
  }
});

router.get(BASE_URL + '/:id', async (ctx) => {
  try {
    const id = ctx.params.id;
    const user = await queries.getSingleUser(id);
    if (user.length) {
      ctx.body = {
        status: 'success',
        data: user
      };
    } else {
      // TODO: add dict of http error codes to replace this magic number
      // ctx.throw(404, 'That user does not exist.');
      ctx.status = 404;
      ctx.body = {
        status: 'error',
        message: 'That user does not exist.'
      };
    }
  } catch (err) {
    console.log(err);
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: err.message || 'An error has occurred'
    };
  }
});




module.exports = router;