const Router = require('koa-router');
const queries = require.main.require('server/db/queries/user');

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
    ctx.body = {
      status: 'success',
      data: user
    };
  } catch (err) {
    console.log(err)
  }
});




module.exports = router;