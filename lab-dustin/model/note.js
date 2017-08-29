'use strict';

const storage = require('../lib/storage');
const debug = require('debug')('app:note');
const uuid = require('uuid/v4');
const createError = require('http-errors');

const Note = module.exports = function(name,content){
  debug('constructor');

  this.id = uuid();
  this.name = name;
  this.content = content;
};

Note.createNote = function(body){
  if (!body){
    Promise.reject(createError(400,'Note body is missing'));
  }
  let note = new Note(body.name,body.content);
  return storage.createItem('note', note);
};

Note.fetchNote = function(id){
  return storage.fetchItem('note',id);
};

Note.updateNote = function(id,body){
  debug(`Update Note${id}`);

  return storage.fetchItem('note',id)
    .then(note => {
      for (var item in note){
        if (item in body) {
          note[item] = body[item];
        }
      }
      //TODO: update the note
      return note;
    });
};
