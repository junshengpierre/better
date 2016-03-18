var mongoose = require('mongoose');
var testing = process.env.NODE_ENV === 'test';
var uri = process.env.MONGOLAB_URI || 'mongodb://localhost/betterdb';

mongoose.connect(uri);
mongoose.Promise = require('bluebird');

// test mongoose bluebird import
// assert.equal(query.exec().constructor, require('bluebird'));

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

if (!testing) {
  db.once('open', console.log.bind(console, 'mongoose connection open'));
}

module.exports = db;
