'use strict';

const app = require('../server');
const request = require('supertest')(app);
const { expect } = require('chai');
const Note = require('../model/note');

describe('/api/note', function(){
  const exampleNote = new Note('Thing to do', 'Content of Note');
  describe('POST',function(){
    it('should return 200 with JSON of note', function(done){
      request.post('/api/note')
        .send(exampleNote)
        .expect(200)
        .expect(res => {
          expect(res.body.name).to.equal(exampleNote.name);
          expect(res.body.content).to.equal(exampleNote.content);
        })
        .end(done);
    });
  });
  describe('PUT',function(){
    before(function(done){
      Note.createNote(exampleNote)
        .then(note => {
          this.putNote = note;
          done();
        })
        .catch(done);
    });
    after(function(done){
      if (this.putNote){
        //TODO: delete the note
        done();
      }
    });
    it('should update a note by id',function(done){
      request.put(`/api/note?id=${this.putNote.id}`)
        .send({ name: 'updated' })
        .expect(200)
        .expect(res => {
          expect(res.body.name).should.equal('updated');
        })
        .end(done);
    });
  });
});
