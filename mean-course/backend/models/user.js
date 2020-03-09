const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique_validator')

const userSchema = mongoose.Schema({
    email: { type: String, recquired: true, unique: true},
    password: { type: String, recquired: true}
});
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);