'use strict';

const express = require('express');
const debug = require('debug')('app:server');

const PORT = process.env.PORT || 3000;
const app = module.exports = express();

app.use(require('./lib/cors-middleware'));

app.get('/500', (req,res,next) => {
  debug('/500');
  next();
});
//REVIEW: this is where post routes will live
app.use(require('./routes/note'));
//REVIEW: this is middleware for error handling
app.use(require('./lib/error-middleware'));

debug('server parent',
  module.parent && module.parentfilename);

if (!module.parent){
  app.listen(PORT,() => {
    debug(`Listening on port ${PORT}`);
  });
}
