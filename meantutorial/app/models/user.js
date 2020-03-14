var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;
var bcrypt      = require("bcrypt-nodejs");

var UserSchema = new Schema({
    username: {type: String, lowercase: true, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true, lowercase: true, unique: true}

})


UserSchema.pre('save', (next)=>{
    var user = this;
    console.log("this username" + user.username);
    bcrypt.hash(user.password, null, null, (err, hash)=>{
        console.log("this password" + user.password);

        if(err) return next(err);
        user.password = hash;
        console.log("this is hash " + user.password);
        

    });
    next();
});

module.exports = mongoose.model('User', UserSchema);