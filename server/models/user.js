const Model = require('objection').Model;
const knex = require('../db/connection')
Model.knex(knex)

class User extends Model {
  // require property
  static get tableName() {
    return 'user';
  }
  
  // optional, unique identifier.
  // can also be composite columns
  static get idColumn() {
    return 'id';
  }
  
  static get virtualAttributes() {
    return ['password', 'password_confirmation'];
  }

  // schema model validation
  // NOT the db schema, used only for input model validation
  // more info here: http://json-schema.org/.
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['username', 'email', 'password_digest'],

      properties: {
        id: {
          type: 'integer'
        },
        username: {
          type: 'string',
          minLength: 3,
          maxLength: 40,
          pattern: /[a-z0-9\_\-]*/i,
        },
        email: {
          type: 'string',
          minLength: 5,
          maxLength: 255,
          format: 'email',
        },
        password: {
          type: 'string',
          minLength: 6,
          maxLength: 100,
        },
        password_confirmation: {
          type: 'string',
          minLength: 6,
          maxLength: 100,
        },
        role: {
          type: 'string',
          enum: ['regular', 'moderator', 'admin'],
        },
      }
    }
  }
  
  
}

module.exports = User;