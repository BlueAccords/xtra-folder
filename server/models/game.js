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
  
  // schema model validation
  // NOT the db schema, used only for input model validation
  // more info here: http://json-schema.org/.
  static get jsonSchema() {
    // TODO: add 'alias' column used in urls
    return {
      type: 'object',
      required: ['title'],
      properties: {
        id: {
          type: 'integer'
        },
        title: {
          type: 'string',
          minLength: 1,
          maxLength: 200,
        },
        description: {
          type: ['string', null],
          maxLength: 500,
        },
        parent_game_id: {
          type: ['integer', null],
        },
      }
    }
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