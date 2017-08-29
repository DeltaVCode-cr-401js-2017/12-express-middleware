'use strict';

const app = require('../server');
const request = require('supertest')(app);
const { expect } = require('chai');
const Workout = require('../model/workout');

describe('/api/workout routes', function (){
  const exampleWorkout = new Workout ('benchpress',135,5,10);
  describe('POST', function (){
    it('should return 200 with JSON of note', function (done){
      request
      .post('/api/workout')
      .send(exampleWorkout)
      .expect(200)
      .expect(res => {
        expect(res.body.exercise).to.equal(exampleWorkout.exercise);
        expect(res.body.weight).to.equal(exampleWorkout.weight);
        expect(res.body.set).to.equal(exampleWorkout.set);
        expect(res.body.rep).to.equal(exampleWorkout.rep);
      })
      .end(done);
    });
  });
});
