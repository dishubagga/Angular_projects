var User    = require('../models/user');

module.exports = (router)=>{
        
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
    return router;
}