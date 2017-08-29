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
  describe('PUT', function (){
    before(function (done){
      Workout.createWorkout(exampleWorkout)
        .then(item => {
          this.putWorkout = item;
          done();
        })
        .catch(done);
    });
    after(function (done) {
      if (this.putWorkout){
        Workout.killWorkout(this.putWorkout.id);
      }
      done();
    });
    it('should update note by id', function (done) {
      request
      .put(`/api/workout?id=${this.putWorkout.id}`)
      .send({exercise: 'updated', newProp: 'should not be found'})
      .expect(200)
      .expect(res => {
        expect(res.body.id).to.equal(this.putWorkout.id);
        expect(res.body.exercise).to.equal('updated');
        expect(res.body.newProp).to.be.undefined;
      })
      .end(done);
    });
  });
  describe('GET',function(){
    before(function (done){
      Workout.createWorkout(exampleWorkout)
        .then(item => {
          this.putWorkout = item;
          done();
        })
        .catch(done);
    });
    after(function (done) {
      if (this.putWorkout){
        Workout.killWorkout(this.putWorkout.id);
      }
      done();
    });
    it('should return the item when given an id', function (done){
      request
        .get(`/api/workout?id=${this.putWorkout.id}`)
        .expect(200)
        .expect(res =>{
          expect(res.body).to.deep.equal(this.putWorkout);
        })
        .end(done);
    });
  });
});
