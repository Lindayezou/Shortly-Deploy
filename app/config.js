var mongoose = require('mongoose');
var db = mongoose.createConnection('mongodb://localhost/shortly');


db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function() {

  mongoose.connection.close();
});

module.exports = db;
