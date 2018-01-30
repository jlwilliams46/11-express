'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const debug = require('debug')('http:server');

const storage = module.exports = {};

storage.create = (schema, item) => {
  debug('Something was created');

  let json = JSON.stringify(item);
  return fs.writeFileProm(`${__dirname}/../data/${schema}/${item._id}.json`, json)
    .then(() => item);
};

storage.fetchOne = (schema, itemId) =>
  debug('Something was fetched');
fs.readFileProm(`${__dirname}/../data/${schema}/${itemId}.json`);

storage.fetchAll = (schema) => {
  debug('Everything was fetched');
};

storage.update = (schema, itemId, item) => {
  debug('Something was updated');
};

storage.destroy = (schema, itemId) => {
  debug('Something was destroyed');

};