const Chip = require('../models/chip');
const Game = require('../models/game');

const ctrlHelpers = require('./_helpers');
const Boom = require('boom');


module.exports = {
  getAll: async function(req, res) {
    const chips = await Chip.query();
    ctrlHelpers.handleResponse(true, res, 200, 'success', chips);
  },
  get: async function(req, res) {
    const id = req.params.id;
    const chip = await Chip.query().findById(id).throwIfNotFound();
    ctrlHelpers.handleResponse(true, res, 200, 'success', chip);
  },
  create: async function(req, res) {
    const chipParams = req.body;
    const chip = await Chip.query()
      .insert(chipParams);
    ctrlHelpers.handleResponse(true, res, 201, 'success', chip);
  },
  update: async function(req, res) {
    const id = req.params.id;
    const chip = await Chip.query().findById(id).throwIfNotFound();
    const chipParams = req.body;
    // check if chip was found
    // TODO: add authorization by author id, or moderator/admin role
    const updatedChip = await Chip.query()
      .patchAndFetchById(chip.id, chipParams);

    ctrlHelpers.handleResponse(true, res, 200, 'success', updatedChip);
  },
  getByPrimaryGame: async function(req, res) {
    const gameId = req.params.id
    const game = await Game.query().findById(gameId).throwIfNotFound();
    const chips = await Chip.query().where('primary_game_id', gameId)
      .eager('chip_codes');

    ctrlHelpers.handleResponse(true, res, 200, 'success', chips);
  }
}