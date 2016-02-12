var config = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userSchema = new Schema({
  id: {type: Number, required: true, unique: true},
  username: {type: String, unique: true}, 
  password: {type: String}, 
  timestamps: Date
});

userSchema.pre('save', function(next){
  var user = this; 
  if(!user.isModified(password)) {
    return next();
  }
  bcrypt.genSalt(24, function(error, salt){
    if (error) {
      return next(error);
    } 
    bcrypt.hash(user.password, salt, function(error, hash){
      if (error) {
        return next(error);
      }
      user.password = hash;
      next();
    });
  });
});

var User = mongoose.model('users', userSchema);






// var User = new config.Users({
//   tableName: 'users',
//   hasTimestamps: true,
//   initialize: function() {
//     this.on('creating', this.hashPassword);
//   },
//   comparePassword: function(attemptedPassword, callback) {
//     bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
//       callback(isMatch);
//     });
//   },
//   hashPassword: function() {
//     var cipher = Promise.promisify(bcrypt.hash);
//     return cipher(this.get('password'), null, null).bind(this)
//       .then(function(hash) {
//         this.set('password', hash);
//       });
//   }
// });

module.exports = User;
