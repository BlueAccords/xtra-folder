const { Model } = require('objection');
const knex = require('../db/connection');
const { DbErrors } = require('objection-db-errors');
const Sch = require('schwifty');
const Joi = require('joi');


class Chip_Code extends DbErrors(Sch.Model) {
  static get tableName() {
    return 'chip_code';
  }
  
  static get idColumn() {
    return ['chip_id', 'code'];
  }

  static get joiSchema() {
    return Joi.object({
        code: Joi.string()
          .regex(/^[a-zA-Z*]$/, 'alphabetical or asterix values only')
          .required(),
        chip_id: Joi.number().integer().required(),
    });
  }

  static get relationMappings() {
    return {
      parent_chip: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + '/chip',
        join: {
          from: 'chip_code.chip_id',
          to: 'chip.id'
        }
      }
    };
  }
}

module.exports = Chip_Code;