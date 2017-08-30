'use strict';

const createError = require('http-errors');
const debug = require('debug')('app:error-middleware');

module.exports = function (err,req,res, next) {
  console.error(err);
  debug(err.status);

  if(err.status) {
    debug('user error');
  }
  else{
    debug('server error');
    err = new createError.InternalServerError(err.message);
  }

  res.status(err.status).send(err.name);
  next();
};
