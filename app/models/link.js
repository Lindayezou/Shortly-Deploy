var db = require('../config');
var crypto = require('crypto');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var urlSchema = new Schema({
  id: {type: Number, required: true, unique: true},
  url: {type: String},
  baseUrl: {type: String},
  code: this.codes(),
  title: String,
  visits: Number,
  timestamps: Date
});

urlSchema.methods.codes = function(model, attrs, options) {
  var shasum = crypto.createHash('sha1');
  shasum.update(this.url);
  return shasum.digest('hex').slice(0, 5);
};

var Link = mongoose.model('urls', urlSchema);

// var Link = db.Model.extend({
//   tableName: 'urls',
//   hasTimestamps: true,
//   defaults: {
//     visits: 0
//   },
//   initialize: function() {
//     this.on('creating', function(model, attrs, options) {
//       var shasum = crypto.createHash('sha1');
//       shasum.update(model.get('url'));
//       model.set('code', shasum.digest('hex').slice(0, 5));
//     });
//   }
// });

module.exports = Link;
