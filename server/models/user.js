const Model = require('objection').Model;
const bcrypt = require('bcryptjs');
const { DbErrors } = require('objection-db-errors');
const Sch = require('schwifty');
const Joi = require('joi');

class User extends DbErrors(Sch.Model) {
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

  // schema validation
  static get joiSchema() {
    return Joi.object({
        id: Joi.number().forbidden(),
        username: Joi.string().min(3).max(40).required(),
        email: Joi.string().email().min(5).max(255).required(),
        // password and password_confirmation are virtual attributes
        password: Joi.string().min(6).max(100).required(),
        password_confirmation: Joi.string()
          .min(6).max(100)
          .valid(Joi.ref('password')) // used to make sure password confirmation equals password
          .required(),
        password_digest: Joi.string().forbidden(),
        role: Joi.string().forbidden(),
    });
  }

  async $beforeInsert(queryContext) {
    await super.$beforeInsert(queryContext);
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(this.password, salt);
    this.password_digest = hash;

    // remove unneeded fields after validation and pw hashing is complete
    delete this.password;
    delete this.password_confirmation;
  }
}

module.exports = User;