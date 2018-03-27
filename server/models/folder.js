const Model = require('objection').Model;

class Folder extends Model {
  static get tableName() {
    return 'folder';
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
      required: ['title'],
      properties: {
        id: {
          type: 'integer'
        },
        title: {
          type: 'string',
          minLength: 3,
          maxLength: 100,
        },
        description: {
          type: ['string', null],
          maxLength: 1000,
        },
        author_id: {
          type: ['integer', null],
        },

      }
    }
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
      }
    };
  }

  async $beforeInsert() {
    this.created_at = new Date().toISOString();
    delete this.updated_at;
  }

  async $beforeUpdate() {
    // await super.$beforeUpdate(opt, queryContext);
    this.updated_at = new Date().toISOString();
    delete this.created_at;
  }
}

module.exports = Folder;