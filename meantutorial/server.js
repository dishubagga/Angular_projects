var express     = require("express");
var app         = express();
var port        = process.env.PORT || 8080;
var morgan      = require("morgan");
var mongoose    = require("mongoose");
var User        = require("./app/models/user");
var bodyParser  = require("body-parser");
var router      = express.Router();
var appRoutes   = require('./app/routes/api')(router);

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use('/api',appRoutes);


mongoose.connect('mongodb://localhost:27017/tutorial', (err)=> {
    if(err){
        console.log("Not connected to the database " + err);

    }
    else{
        console.log("successfull connected to mongodb")
    }
});





app.listen(port, function(){
    console.log("running server on port " + port);
})