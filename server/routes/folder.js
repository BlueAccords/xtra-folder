const Router = require('koa-router');
const Folder = require('../models/folder');

const router = new Router();
const BASE_URL = `/api/folder`;

router.get(BASE_URL, async (ctx) => {
  try {
    const folders = await Folder.query();
    ctx.body = {
      status: 'success',
      data: folders
    };
  } catch (err) {
    console.log(err);
    ctx.throw(500, err);
  }
});

router.get(BASE_URL + '/:id', async (ctx) => {
  try {
    const id = ctx.params.id;
    const folder = await Folder.query().findById(id);

    // check if folder was found
    if(folder) {
      ctx.body = {
        status: 'success',
        data: folder
      };
    } else {
      ctx.status = 404;
      ctx.body = {
        status: 'error',
        message: 'That folder does not exist.'
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

router.post(BASE_URL, async(ctx) => {
  try {
    folderParams = ctx.request.body;

    // set folder user, author id if logged in
    if(ctx.isAuthenticated()) {
      folderParams.author_id = ctx.state.user.id;
    }
    const folder = await Folder.query()
      .insert(folderParams);
    
    // success route
    ctx.status = 201;
      ctx.body = {
        status: 'success',
        data: folder
      }; 
    // error route
  } catch(err) {
    console.log(err);
    // model validation errors thrown here
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: err || 'something went wrong'
    };

    // TODO: pretty this up, so a status is set as well
    ctx.throw(401, err);
  }
})




module.exports = router;