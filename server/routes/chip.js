const Router = require('koa-router');
const Chip = require('../models/chip');

const router = new Router();
const BASE_URL = `/api/chip`;

router.get(BASE_URL, async (ctx) => {
  try {
    const chips = await Chip.query();
    ctx.body = {
      status: 'success',
      data: chips
    };
  } catch (err) {
    console.log(err);
    ctx.throw(500, err);
  }
});

router.get(BASE_URL + '/:id', async (ctx) => {
  try {
    const id = ctx.params.id;
    const chip = await Chip.query().findById(id);

    // check if chip was found
    if(chip) {
      ctx.body = {
        status: 'success',
        data: chip
      };
    } else {
      ctx.status = 404;
      ctx.body = {
        status: 'error',
        message: 'That chip does not exist.'
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

// create new chip
router.post(BASE_URL, async(ctx) => {
  try {
    chipParams = ctx.request.body;

    const chip = await Chip.query()
      .insert(chipParams);
    
    // success route
    ctx.status = 201;
      ctx.body = {
        status: 'success',
        data: chip
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

    ctx.throw(401, err);
  }
});

router.put(`${BASE_URL}/:id`, async(ctx) => {
  try {
    const id = ctx.params.id;
    const chip = await Chip.query().findById(id);
    const chipParams = ctx.request.body;
    // check if chip was found
    if(chip) {
      // TODO: add authorization by author id, or moderator/admin role
      const updatedChip = await Chip.query()
        .patchAndFetchById(chip.id, chipParams);
      // success route
      ctx.status = 200;
        ctx.body = {
          status: 'success',
          data: updatedChip
        }; 

    } else {
      ctx.status = 404;
      ctx.body = {
        status: 'error',
        message: 'That chip does not exist.'
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
})





module.exports = router;