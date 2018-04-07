const Model = require('objection').Model;
const knex = require('../db/connection');
const Joi = require('joi');
const Sch = require('schwifty');

class Folder extends Sch.Model {
  static get tableName() {
    return 'folder';
  }
  
  // optional, unique identifier.
  // can also be composite columns
  static get idColumn() {
    return 'id';
  }

  // schema validation using joi
  static get joiSchema() {
    return Joi.object({
        id: Joi.number().forbidden(),
        title: Joi.string().min(3).max(100).required(),
        // allows empty, or null description as well
        description: Joi.string().allow('', null).max(1000).optional(),
        author_id: Joi.number().allow(null).min(0).optional(),
    });
  }

  static get relationMappings() {
    return {
      owner: {
        relation: Model.BelongsToOneRelation,
        // The related model. This can be either a Model subclass constructor or an
        // absolute file path to a module that exports one. We use the file path version
        // here to prevent require loops.
        modelClass: __dirname + '/user',
        join: {
          from: 'folder.author_id',
          to: 'user.id'
        }
      },
      child_chips: {
        relation: Model.ManyToManyRelation,
        modelClass: __dirname + '/chip',
        join: {
          from: 'folder.id',
          // ManyToMany relation needs the `through` object
          // to describe the join table.
          through: {
            // If you have a model class for the join table
            // you need to specify it like this:
            // modelClass: PersonMovie,
            from: 'chip_copy.folder_id',
            to: 'chip_copy.chip_id'
          },
          to: 'chip.id'
        }
      }
    };
  }

  $beforeInsert() {
    // this.created_at = knex.fn.now();
    delete this.updated_at;
  }

  $beforeUpdate() {
    // await super.$beforeUpdate(opt, queryContext);
    this.updated_at = knex.fn.now();
    delete this.created_at;
  }
}

module.exports = Folder;