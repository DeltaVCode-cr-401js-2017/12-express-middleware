'use strict';

const debug = require('debug')('app:routes/workout');
const Workout = require('../model/workout');
const router = module.exports =  new require('express').Router();
const jsonParser = require('body-parser').json();

router.post('/api/workout', jsonParser, function (req, res, next){
  debug('POST: /api/workout');
  Workout.createWorkout(req.body)
    .then(workout => res.json(workout))
    .catch(err => next(err));
});
