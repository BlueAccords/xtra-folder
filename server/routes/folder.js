const Router = require('koa-router');
const Folder = require('../models/folder');
const ChipCopy = require('../models/chip_copy');
const Chip = require('../models/chip');

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

// create a new chip copy for a folder
router.post(`${BASE_URL}/:id/chips`, async(ctx) => {
  const id = ctx.params.id;
  const chipCopyParams = ctx.request.body;
  const newChipCopy = await ChipCopy.query().insert(chipCopyParams);

  ctx.body = {
    status: 'success',
    data: newChipCopy
  };
});

// create a new chip copy for a folder
router.put(`${BASE_URL}/:folderId/chips/:chipCopyId`, async(ctx) => {
  const folderId = ctx.params.folderId;
  const chipCopyId = ctx.params.chipCopyId

  const chipCopyParams = ctx.request.body;
  const updatedChipCopy = await ChipCopy.query()
    .patchAndFetchById(chipCopyId, chipCopyParams);


  ctx.body = {
    status: 'success',
    data: updatedChipCopy
  };
});

router.del(`${BASE_URL}/:folderId/chips/:chipCopyId`, async(ctx) => {
  const chipCopyId = ctx.params.chipCopyId;
  const result = await ChipCopy.query()
    .delete()
    .where('id', chipCopyId);

  ctx.body = {
    status: 'success',
    data: result
  }; 
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
});

// update folder
router.put(`${BASE_URL}/:id`, async(ctx) => {
  try {
    const id = ctx.params.id;
    const folder = await Folder.query().findById(id);
    const folderParams = ctx.request.body;
    // check if folder was found
    if(folder) {
      // TODO: add authorization by author id, or moderator/admin role
      const updatedFolder = await Folder.query()
        .patchAndFetchById(folder.id, folderParams);
      // success route
      ctx.status = 200;
        ctx.body = {
          status: 'success',
          data: updatedFolder
        }; 

    } else {
      ctx.status = 404;
      ctx.body = {
        status: 'error',
        message: 'That folder does not exist.'
      };
    }
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
    ctx.throw(400, err);
  }
});







module.exports = router;