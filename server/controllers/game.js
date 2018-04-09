const Game = require('../models/game');
const ctrlHelpers = require('./_helpers');
const Boom = require('boom');



module.exports = {
  getAll: async function(req, res) {
    const games = await Game.query();
    ctrlHelpers.handleResponse(true, res, 200, 'success', games);
  },
  get: async function(req, res) {
    const id = req.params.id;
    const game = await Game.query()
      .findById(id)
      .eager('sub_games')
      .throwIfNotFound();

    ctrlHelpers.handleResponse(true, res, 200, 'success', game);
  },
  getSubGames: async function(req, res) {
    const games = await Game
      .query()
      .whereNull('parent_game_id')
      .eager('sub_games')
      .throwIfNotFound()
      // .$relatedQuery('sub_games');

    ctrlHelpers.handleResponse(true, res, 200, 'success', games);
  }
}