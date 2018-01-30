'use strict';

const Note = require('../model/note');
const storage = require('../lib/storage');
const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');
const debug = require('debug')('http:route-note');

module.exports = function(router) {
  router.post('/note', bodyParser, (req, res) => {
    debug('Post');
    new Note(req.body.title, req.body.content)
      .then(note => storage.create('note', note))
      .then(item => res.status(201).json(item))  // 201: Created
      .catch(err => errorHandler(err, res));
  });
  router.get('/note/:_id', (req, res) => {
    debug('Get One');
    storage.fetchOne('note', req.params._id)
      .then(buffer => buffer.toString())
      .then(json => JSON.parse(json))
      .then(note => res.status(200).json(note))  // 200: Success
      .catch(err => errorHandler(err, res));
  });
  
  router.get('/note', (req,res) => {
    debug('Get All');
    storage.fetchAll('note')
      .then(buffer => buffer.toString())
      .then(json => JSON.parse(json))
      .then(item => res.status(200).json(item)) // 200: Success
      .catch(err => errorHandler(err, res));
  });
  
  router.put('/note/:_id', bodyParser, (req,res) => {
    debug('Put');
    storage.update(req.params._id, req.body);
    new Note(req.body.title, req.body.content)
      .then(note => storage.update('note', req.params._id, note))
      .then(item => res.status(204).json(item)) // 201: No Content
      .catch(err => errorHandler(err, res));
  });

  router.delete('/note/:_id', bodyParser, (req,res) => {
    debug('Delete');
    storage.destroy('note', req.params._id)
      .then(item => res.status(204).json(item)) // 204: No Content
      .catch(err => errorHandler(err, res));
  });
};
