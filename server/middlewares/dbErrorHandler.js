// error handler for all database errors thrown by objectionjs

const {
  ValidationError,
  NotFoundError
} = require('objection');


const {
  DBError,
  ConstraintViolationError,
  UniqueViolationError,
  NotNullViolationError,
  ForeignKeyViolationError,
  CheckViolationError,
  DataError
} = require('objection-db-errors');

// TODO: refactor to use boom errors
function errorHandler(err, req, res, next) {
  if (err instanceof ValidationError) {
    switch (err.type) {
      case 'ModelValidation':
        res.status(400).send({
          message: err.message,
          error: 'ModelValidation',
          data: err.data
        });
        break;
      case 'RelationExpression':
        res.status(400).send({
          message: err.message,
          error: 'InvalidRelationExpression',
          data: {}
        });
        break;
      case 'UnallowedRelation':
        res.status(400).send({
          message: err.message,
          error: 'UnallowedRelation',
          data: {}
        });
        break;
      case 'InvalidGraph':
        res.status(400).send({
          message: err.message,
          error: 'InvalidGraph',
          data: {}
        });
        break;
      default:
        res.status(400).send({
          message: err.message,
          error: 'UnknownValidationError',
          data: {}
        });
        break;
    }
  } else if (err instanceof NotFoundError) {
    res.status(404).send({
      message: err.message,
      error: 'NotFound',
      data: {}
    });
  } else if (err instanceof UniqueViolationError) {
    console.log(err);
    res.status(409).send({
      message: err.message,
      error: 'UniqueViolation',
      data: {
        columns: err.columns,
        table: err.table,
        constraint: err.constraint
      }
    });
  } else if (err instanceof NotNullViolationError) {
    res.status(400).send({
      message: err.message,
      error: 'NotNullViolation',
      data: {
        column: err.column,
        table: err.table,
      }
    });
  } else if (err instanceof ForeignKeyViolationError) {
    res.status(409).send({
      message: err.message,
      error: 'ForeignKeyViolation',
      data: {
        table: err.table,
        constraint: err.constraint
      }
    });
  } else if (err instanceof CheckViolationError) {
    res.status(400).send({
      message: err.message,
      error: 'CheckViolation',
      data: {
        table: err.table,
        constraint: err.constraint
      }
    });
  } else if (err instanceof DataError) {
    res.status(400).send({
      message: err.message,
      error: 'InvalidData',
      data: {}
    });
  } else if (err instanceof DBError) {
    res.status(500).send({
      message: err.message,
      error: 'UnknownDatabaseError',
      data: {}
    });
  } else {
    // if error is NOT a db/model error then pass error to next middleware
    return next(err);
  }
}

module.exports = {
  errorHandler
}