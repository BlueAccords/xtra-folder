const Joi = require('joi');

module.exports = {
  getAll: {
    options: {
      allowUnknownQuery: false,
      allowUnknownBody: false,
    },
    query: {
      q: Joi.string()
        .max(100)
        .optional(),
      sortKey: Joi.string()
        .valid(['id', 'title', 'description', 'author_id'])
        .required(),
      sortDirection: Joi.string()
        .valid(['ASC', 'DESC'])
        .required(),
      page: Joi.number()
        .integer().min(1).optional(),
      limit: Joi.number()
        .integer().optional(),
    }
  }
}