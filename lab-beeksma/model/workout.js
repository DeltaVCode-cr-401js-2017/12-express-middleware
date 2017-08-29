'use strict';

const debug = require('debug')('app:note');
const storage = require('../lib/storage');
const uuidv4 = require('uuid/v4');
const createError = require('http-errors');

const Workout = module.exports = function(exercise, weight, set, rep){
  this.id = uuidv4();
  this.exercise = exercise;
  this.weight = weight;
  this.set = set;
  this.rep = rep;
};

Workout.createWorkout = function(body){
  if(!body) {
    return Promise.reject(createError(400, 'body is missing'));
  }
  let workout = new Workout(body.exercise,body.weight,body.set,body.rep);
  debug(`Createing ${workout}`);
  return storage.createItem('Workout', workout);
};

Workout.fetchWorkout = function(id) {
  debug(`fetch workout (${id})`);
  return storage.fetchItem('workout', id);
};

Workout.updateWorkout = function(id, body){
  debug(`update workout (${id})`);
  return storage.fetchItem('workout',id)
    .then(item=> {
      for(var prop in item){
        if(prop === 'id') {
          continue;
        }
        if (prop in body){
          item[prop] = body[prop];
        }
      }
      return item;
    });

};
