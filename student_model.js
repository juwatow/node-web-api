var mongoose = require('mongoose');

var studentSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String
});

module.exports = mongoose.model('Student', studentSchema);