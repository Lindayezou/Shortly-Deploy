var db = require('../config');
var crypto = require('crypto');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var urlSchema = new Schema({
  url: {type: String},
  baseUrl: {type: String},
  code: String,
  title: String,
  visits: Number,
});

var Link = mongoose.model('urls', urlSchema);

urlSchema.pre('save', function(next) {
  var shasum = crypto.createHash('sha1');
  shasum.update(this.url);
  this.code = shasum.digest('hex').slice(0, 5);
  next();
});



module.exports = Link;
