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

router.put('/api/workout', jsonParser, function (req,res,next){
  debug('PUT: /api/workout');
  Workout.updateWorkout(req.query.id, req.body)
    .then(item => res.json(item))
    .catch(next);
});

router.get('/api/workout', function (req, res, next){
  debug('GET: /api/workout');
  Workout.fetchWorkout(req.query.id)
    .then(item => res.json(item))
    .catch(next);
});

router.delete('/api/workout', function (req, res, next){
  debug('DELETE: /api/workout');
  Workout.killWorkout(req.query.id)
    .then(() => res.sendStatus(204))
    .catch(next);
});
