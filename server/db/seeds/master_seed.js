// master seed data file, used so we can seed data sequentially
const userData = require('./data/user_data');
const folderData = require('./data/folder_data');
const gameData = require('./data/game_data');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('user').del()
    .then(function () {
      // Delete all folders
      return knex('folder').del();
    })
    .then(function() {
      return knex('game').del();
    })
    .then(function() {
      // Inserts seed entries
      return knex('user').insert(userData);
    })
    .then(function() {
      return knex('game').insert(gameData.parent_game_data());
    })
    .then(function() {
      return knex.select('id').from('game').first().then(function(firstGame) {
        return knex('game').insert(gameData.child_game_data(firstGame));
      })
    })
    .then(function() {
      return knex.select('id').from('user').first().then(function(oneUser) {
        return knex('folder').insert(folderData(oneUser));
      });
    })
};