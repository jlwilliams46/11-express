'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const triggerError = require('http-errors');
const debug = require('debug')('http:server');

const storage = module.exports = {};

storage.create = (schema, item) => {
  debug('Something was created');
  if (!schema) return Promise.reject(triggerError(400, 'Bad Request!'));
  if (!item) return Promise.reject(triggerError(400, 'Bad Request!'));

  let json = JSON.stringify(item);
  return fs.writeFileProm(`${__dirname}/../data/${schema}/${item._id}.json`, json)
    .then(() => item);
};

storage.fetchOne = (schema, itemId) => {
  debug('Something was fetched');
  if (!schema) return Promise.reject(triggerError(400, 'Bad Request!'));
  if (!itemId) return Promise.reject(triggerError(400, 'Bad Request!'));
  fs.readFileProm(`${__dirname}/../data/${schema}/${itemId}.json`);

};

storage.fetchAll = (schema) => {
  debug('Everything was fetched');
  if (!schema) return Promise.reject(triggerError(400, 'Bad Request!'));
  return fs.readFileProm(`${__dirname}/../data/${schema}`);
};

storage.update = (schema, itemId, item) => {
  debug('Something was updated');
  if (!schema) return Promise.reject(triggerError(400, 'Bad Request!'));
  if (!itemId) return Promise.reject(triggerError(400, 'Bad Request!'));
  if (!item) return Promise.reject(triggerError(400, 'Bad Request!'));

  let json = JSON.stringify(item);
  return fs.writeFileProm(`${__dirname}/../data/${schema}/${itemId}.json`, json)
    .then(() => item);
};

storage.destroy = (schema, itemId) => {
  debug('Something was destroyed');
  if (!schema) return Promise.reject(triggerError(400, 'Bad Request!'));
  if (!itemId) return Promise.reject(triggerError(400, 'Bad Request!'));
  return fs.unlinkProm(`${__dirname}/../data/${schema}/${itemId}.json`);
};