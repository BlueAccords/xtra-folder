// master seed data file, used so we can seed data sequentially
const userData = require('./data/user_data');
const folderData = require('./data/folder_data');
const gameData = require('./data/game_data');
const chipData = require('./data/chip_data');
const chipCodeData = require('./data/chip_data_with_codes');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('chip').del()
  .then(function () {
    return knex.raw('ALTER TABLE chip AUTO_INCREMENT = 0')
  })
  .then(function () {
    return knex('folder').del();
  })
  .then(function() {
    return knex.raw('ALTER TABLE folder AUTO_INCREMENT = 0')
  })
  .then(function () {
    return knex('game').del();
  })
  .then(function() {
    return knex.raw('ALTER TABLE game AUTO_INCREMENT = 0')
  })
  .then(function () {
    return knex('user').del();
  })
  .then(function() {
    return knex.raw('ALTER TABLE user AUTO_INCREMENT = 0')
  })
  .then(function () {
    return knex('chip_copy').del();
  })
  .then(function() {
    return knex.raw('ALTER TABLE chip_copy AUTO_INCREMENT = 0')
  })
  .then(function () {
    return knex('chip_code').del();
  })
  .then(function() {
    return knex.raw('ALTER TABLE chip_code AUTO_INCREMENT = 0')
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
  .then(function() {
    chipData.forEach(function(chip, index, arr) {
      chipData[index].primary_game_id = 1; 
    });
    return knex('chip').insert(chipData);
  })
  .then(function() {

    // selects all chips, so we can use their ids
    return knex.select('*').from('chip').then(function(firstTenChips) {
      // create list of valid chip_code objects
      listOfCodes = [];
      listOfChipCodeObj = [];
      chipCodeData.forEach(function(chip, index, arr) {
        const chipName = chipCodeData[index].original_name;
        const chipCodes = chipCodeData[index]["Code(s)"];
        const codesList = chipCodes.split(",");

        /**
         * rObj in the format of:
         * {
         *  code: [A-Z\*],
         *  chip_id: [foreign key to chip id]
         * }
         */
        const codeObj = codesList.map(obj => {
          let rObj = {};
          rObj.code = obj.trim();
          rObj.chip_id = firstTenChips[index].id
          
          return rObj;
        });

        // concat list of valid objects so we have a flat list of chip_code objects
        listOfCodes = listOfCodes.concat(codeObj);
      });
      
      // insert entire list of chip_code objects generated
      return knex('chip_code').insert(listOfCodes);
    });
  })
  
};