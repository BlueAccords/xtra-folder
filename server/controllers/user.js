const User = require('./../models/user');
const Boom = require('boom');
const ctrlHelpers = require('./_helpers');


module.exports = {
  getAll: async function(req, res) {
    const users = await User.query();
    ctrlHelpers.handleResponse(true, res, 200, 'success', users);
  },
  get: async function(req, res) {
    const id = req.params.id;
    const user = await User.query().findById(id).throwIfNotFound();
    ctrlHelpers.handleResponse(true, res, 200, 'success', user);
  }
}