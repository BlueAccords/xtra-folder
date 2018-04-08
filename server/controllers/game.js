const Router = require('koa-router');
const Game = require('../models/game');

const router = new Router();
const BASE_URL = `/api/game`;

// get all games
router.get(BASE_URL, async (ctx) => {
  try {
    const games = await Game.query();
    ctx.body = {
      status: 'success',
      data: games
    };
  } catch (err) {
    console.log(err);
    ctx.throw(400, err);
  }
});

router.get(BASE_URL + '/subgames', async (ctx) => {
  try {
    const games = await Game
      .query()
      .whereNull('parent_game_id')
      .eager('sub_games')
      // .$relatedQuery('sub_games');

    // check if game was found
    if(games) {
      ctx.body = {
        status: 'success',
        data: games
      };
    } else {
      ctx.status = 404;
      ctx.body = {
        status: 'error',
        message: 'That game does not exist.'
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



router.get(BASE_URL + '/:id', async (ctx) => {
  try {
    const id = ctx.params.id;
    const game = await Game.query()
      .findById(id)
      .eager('sub_games');

    // check if game was found
    if(game) {
      ctx.body = {
        status: 'success',
        data: game
      };
    } else {
      ctx.status = 404;
      ctx.body = {
        status: 'error',
        message: 'That game does not exist.'
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