var User    = require('../models/user');
var jwt     = require('jsonwebtoken'); 
var secret  = 'harrypotter';
module.exports = (router)=>{
    // registrationRoute 
    router.post('/users', (req,res)=> {
        var user = new User();
        console.log(req.body.username);
        user.username   = req.body.username;
        user.password   = req.body.password;
        user.email      = req.body.email;
        if(req.body.username == null || req.body.username == '' || req.body.password == null || req.body.password == '' || req.body.email == null || req.body.email == '' ){
            res.json({ success: false, message: "Ensure username, email, password is provided"});
        }
        else {
            user.save((err)=>{
                if(err){
                    res.json({ success: false, message: "username or email already exsist"});
                    
                }
                else{
                    res.json({ success: true, message: "user created"});
                }
            })
        }
       
        
    });

    //login Route
    router.post('/authenticate', function(req,res){
        User.findOne({username: req.body.username }).select('email username password').exec(function(err, user){
            if(err) throw  err;

            if(!user){
                console.log("if not user");
                res.json({ success: false, message: 'Could not authenticate user'});
            }
            else if(user){
                console.log("if valid password");
                if(req.body.password){
                    var validPassword = user.comparePassword(req.body.password);
                }
                else{
                    res.json({ success: false, message: 'No password provided'});
                }
                if(!validPassword){
                    res.json({ success: false, message: 'Could not authenticate password'});
                }
                else{
                    var token = jwt.sign({ username: user.username, email: user.email}, secret, {expiresIn: '24h'});
                    res.json({ success: true, message: 'User authenticated!', token: token});
                }
            }

        })
    })
    return router;
}