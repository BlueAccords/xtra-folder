const Model = require('objection').Model;
const knex = require('../db/connection');

class Chip extends Model {
  static get tableName() {
    return 'chip';
  }
  
  // optional, unique identifier.
  // can also be composite columns
  static get idColumn() {
    return 'id';
  }
  
  // schema model validation
  // NOT the db schema, used only for input model validation
  // more info here: http://json-schema.org/.
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['original_name'],
      properties: {
        id: {
          type: 'integer'
        },
        original_name: {
          type: 'string',
          minLength: 1,
          maxLength: 200,
        },
        long_name: {
          type: ['string', null],
          maxLength: 1000,
        },
        original_description: {
          type: ['string', null],
          maxLength: 200,
        },
        long_description: {
          type: ['string', null],
          maxLength: 200,
        },
        chip_number: {
          type: ['integer', null],
          minimum: 0
        },
        image_path: {
          type: ['string', null],
          maxLength: 200,
        },
        element: {
          type: ['string', null],
          enum: ['fire', 'aqua', 'elec', 'wood', 
      'sword', 'wind', 'cursor', 'break', 'plus', 
      'recovery', 'obstacle', 'invisible', 'ground_cracking']
        },
        'type': {
          type: ['string', null],
          enum: ['standard', 'mega', 'giga', 'dark']
        },
        damage: {
          type: ['integer', null],
          minimum: -1
        },
        memory: {
          type: ['integer', null],
          minimum: 0
        },
        primary_game_id: {
          type: ['integer', null],
          minimum: 0
        },
        sub_game_id: {
          type: ['integer', null],
          minimum: 0
        },
      }
    }
  }

  static get relationMappings() {
    return {
      primary_game: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + '/game',
        join: {
          from: 'chip.primary_game_id',
          to: 'game.id'
        }
      },
      sub_game: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + '/game',
        join: {
          from: 'chip.sub_game_id',
          to: 'game.id'
        }
      },
      chip_codes: {
        relation: Model.HasManyRelation,
        modelClass: __dirname + '/chip_code',
        join: {
          from: 'chip_code.chip_id',
          to: 'chip.id'
        }
      }
    };
  }
}

module.exports = Chip;