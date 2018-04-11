const Model = require('objection').Model;
const knex = require('../db/connection');
const { DbErrors } = require('objection-db-errors');
const Sch = require('schwifty');
const Joi = require('joi');

class Chip_Copy extends DbErrors(Sch.Model) {
  static get tableName() {
    return 'chip_copy';
  }
  
  static get idColumn() {
    return 'id';
  }
  
  // schema model validation
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['code', 'chip_id', 'folder_id'],
      properties: {
        id: {
          type: 'integer'
        },
        code: {
          type: 'string',
          minLength: 1,
          maxLength: 1,
        },
        chip_id: {
          type: 'integer',
          minimum: 0
        },
        folder_id: {
          type: 'integer',
          minimum: 0
        },
      }
    }
  }

  static get relationMappings() {
    return {
      parent_chip: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + '/chip',
        join: {
          from: 'chip_copy.chip_id',
          to: 'chip.id'
        }
      },
      parent_folder: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + '/folder',
        join: {
          from: 'chip_copy.folder_id',
          to: 'folder.id'
        }
      }
    };
  }
}

module.exports = Chip_Copy;