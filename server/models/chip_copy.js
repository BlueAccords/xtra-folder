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
  
  // schema validation
  static get joiSchema() {
    return Joi.object({
        id: Joi.number().integer().forbidden(),
        code: Joi.string()
          .regex(/^[a-zA-Z*]$/, 'alphabetical or asterix values only')
          .required(),
        chip_id: Joi.number().integer().required(),
        folder_id: Joi.number().integer().required(),
    });
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