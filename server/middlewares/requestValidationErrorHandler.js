// error handler for all database errors thrown by objectionjs

const { ValidationError } = require('express-validation');
const Boom = require('boom');

function errorHandler(err, req, res, next) {
  let errMessageList = [];

  let formattedError = Boom.badRequest("Invalid query parameters");
  if (err instanceof ValidationError) {
    err.errors.forEach(errItem => {
      errMessageList = errMessageList.concat(errItem.messages);
    });

    formattedError.reformat();
    formattedError.output.payload["error"] = errMessageList;
    return next(formattedError);
  }  else {
    return next(err);
  }
}
module.exports = {
  errorHandler
}