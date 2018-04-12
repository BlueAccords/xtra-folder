const Model = require('objection').Model;
const knex = require('../db/connection');
const { DbErrors } = require('objection-db-errors');
const Sch = require('schwifty');
const Joi = require('joi');

class Game extends DbErrors(Sch.Model) {
  static get tableName() {
    return 'game';
  }
  
  static get idColumn() {
    return 'id';
  }
  
  // schema validation
  static get joiSchema() {
    return Joi.object({
        id: Joi.number().integer().forbidden(),
        title: Joi.string().min(1).max(200).required(),
        description: Joi.string().max(500).optional(),
        parent_game_id: Joi.number().integer().optional(),
    });
  }

  static get relationMappings() {
    return {
      sub_games: {
        relation: Model.HasManyRelation,
        // The related model. This can be either a Model subclass constructor or an
        // absolute file path to a module that exports one. We use the file path version
        // here to prevent require loops.
        modelClass: __dirname + '/game',
        join: {
          from: 'game.id',
          to: 'game.parent_game_id'
        }
      }
    };
  }
}

module.exports = Game;