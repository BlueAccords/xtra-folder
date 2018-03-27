// master seed data file, used so we can seed data sequentially
const userData = require('./data/user_data');
const folderData = require('./data/folder_data');
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('user').del()
    .then(function () {
      // Delete all folders
      return knex('folder').del();
    })
    .then(function() {
      // Inserts seed entries
      return knex('user').insert(userData);
    })
    .then(function() {
      return knex.select('id').from('user').first().then(function(oneUser) {
        return knex('folder').insert(folderData(oneUser));
      })
    })
};