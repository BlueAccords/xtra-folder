const Model = require('objection').Model;
const knex = require('../db/connection');
const { DbErrors } = require('objection-db-errors');
const Sch = require('schwifty');
const Joi = require('joi');

class Chip extends DbErrors(Sch.Model) {
  static get tableName() {
    return 'chip';
  }
  
  // optional, unique identifier.
  // can also be composite columns
  static get idColumn() {
    return 'id';
  }

  // schema validation
  static get joiSchema() {
    return Joi.object({
        id: Joi.number().integer().forbidden(),
        original_name: Joi.string().min(1).max(200).required(),
        long_name: Joi.string().max(200).optional(),
        original_description: Joi.string().max(200).optional(),
        long_description: Joi.string().max(500).optional(),
        chip_number: Joi.number().integer().optional(),
        image_path: Joi.string().max(200).optional(),
        element: Joi.string().uppercase().valid(
          'FIRE', 'AQUA', 'ELEC', 'WOOD', 
          'SWORD', 'WIND', 'CURSOR', 'BREAK', 'PLUS', 
        'RECOVERY', 'OBSTACLE', 'INVISIBLE', 'GROUND_CRACKING'
        ).optional(),
        type: Joi.string().uppercase().valid(
          'STANDARD', 'MEGA', 'GIGA', 'DARK'
        ).optional(),
        damage: Joi.number().integer().min(-1).optional(),
        memory: Joi.number().integer().min(0).optional(),
        primary_game_id: Joi.number().integer().min(0).optional(),
        sub_game_id: Joi.number().integer().min(0).optional(),
    });
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