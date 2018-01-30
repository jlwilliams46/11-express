'use strict';

// Application dependencies
const express = require('express');
const errorHandler = require('./error-handler');
const debug = require('debug')('http');


// Application setup
const app = express();
const router = express.Router();

app.use('/api/v1', router);
// app.use(bodyParser) // Applies the package to every route in the app

// Route setup
require('../route/route-note')(router);
// require('../route/route-category')(router)
app.use('/*', (req, res) => errorHandler(new Error('Path Error. Route not found.'), res));

// Server controls
const server = module.exports = {};
server.isOn = false;

server.start = function(port, callback) {
  debug('Server Stop');
  if(server.isOn) return callback(new Error('Server running. Cannot start server again.'));
  server.isOn = true;
  return app.listen(port, callback);
};

server.stop = function(callback) {
  debug('Server Start');
  if(!server.isOn) return callback(new Error('Server not running. You\'re dumb. Don\'t do that.'));
  server.isOn = false;
  return app.close(callback);
};