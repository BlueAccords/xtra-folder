const Model = require('objection').Model;
const knex = require('../db/connection');

class Chip_Code extends Model {
  static get tableName() {
    return 'chip_code';
  }
  
  static get idColumn() {
    return ['chip_id', 'code'];
  }
  
  // schema model validation
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['code', 'chip_id'],
      properties: {
        code: {
          type: 'string',
          minLength: 1,
          maxLength: 1,
        },
        chip_id: {
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
          from: 'chip_code.chip_id',
          to: 'chip.id'
        }
      }
    };
  }
}

module.exports = Chip_Code;