'use strict';

const express = require('express');
const debug = require('debug')('app:server');

const PORT = process.env.PORT || 3000;
const app = module.exports = express();

app.use(require('./lib/cors-middleware'));

app.get('/500', (req,res) => {
  debug('/500');
  debug(res.headers);
  req.whatever();
});

//REVIEW: this is where routes will live
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
