'use strict';

const debug = require('debug')('app:routes/note');
const Note = require('../model/note');
const router = new require('express').Router();
const jsonParser = require('body-parser').json();

router.post('/api/note',jsonParser,function(req,res,next){
  debug('POST: /api/note');

  Note.createNote(req.body)
    .then(note => res.json(note))
    .catch(err => next(err));
});

router.put('/api/note',jsonParser,function(req,res,next){
  debug('PUT: /api/note');

  Note.updateNote(req.query.id,req.body)
    .then(res.json.bind(res))
    .catch(next);
});

module.exports = router;
