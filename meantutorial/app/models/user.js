var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var USerSchema = new Schema({
    username: {type: String, lowercase: true, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true, lowercase: true, unique: true}

})

module.exports = mongoose.model('User', USerSchema);