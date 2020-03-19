TwitterStrategy     = require('passport-twitter').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuthStrategy;
var User            = require('../models/user');
var session         = require('express-session');
var jwt             = require('jsonwebtoken');
var secret          = 'harrypotter';

module.exports = function(app, passport){

        app.use(passport.initialize());
        app.use(passport.session());
        app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: true, cookie: { secure: false}}));

        passport.serializeUser(function(user, done){
            token = jwt.sign({ username: user.username, email: user.email }, secret, { expiresIn: '24h'});
            done(null, user.id);
        })
        //google authentication
        passport.use(new GoogleStrategy({
            consumerKey: '361455440820-b5meaou864k1e3v6oir0hsudjpuhrro7.apps.googleusercontent.com',
            consumerSecret: '9ubl5nHeHb97oHh2pSJ3HJms',
            callbackURL: "http://localhost:8080/auth/google/callback"
          },
          function(token, tokenSecret, profile, done) {
            console.log(profile);
            //   User.findOrCreate({ googleId: profile.id }, function (err, user) {
            //     return done(err, user);
            // });
            done(null, profile);
          }
        ))

    app.get('/auth/google',passport.authenticate('google', { scope: 'https://www.google.com/m8/feeds' }));
    app.get('/auth/google/callback',passport.authenticate('google', { failureRedirect: '/googleerror' }),function(req, res) {
          res.redirect('/googleerror/' + token);
    });
      
    
    return passport;
}