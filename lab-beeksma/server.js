'use strict';

const express  = require('express');
const debug = require('debug')('app:server');

const PORT = process.env.PORT || 3000;
const app = module.exports = express();

app.use(require('./lib/cors-middleware.js'));

app.get('/500', (req,res,next) => {
  next(new Error('boom'));
});


app.use(require('./routes/workout-route'));

app.use(require('./lib/error-middleware'));

if (!module.parent) {
  app.listen(PORT, () => {
    debug( `Listening on ${PORT}`);
  });
}