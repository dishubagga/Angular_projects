const express       = require('express');
const bodyParser    = require('body-parser');
const path          = require('path');
const app           = express();
const mongoose      = require('mongoose');

mongoose.connect('mongodb://localhost:27017/epicchat',{useNewUrlParser: true});
mongoose.promise    = global.Promise; //used promise and global to use mongoose anywhere as Async when writing mongoose.

app.use(bodyParser.json()); // it will parse all the incoming and outgoing request with json parser
app.use(express.static(path.join(__dirname, '../dist'))); //directory of static files 

const Message       = require('./models/message');

app.get('/api/chat', (req, res) => {
    Message.find().then(rec =>{ //return any record in msg collection 
        if(rec){
            res.send(rec);
        }
        else{
            res.send([]);
        }
    })
})
app.post('/api/chat', (req, res) => {
    const newMessage = new Message({
        _id: mongoose.Types.ObjectId(),
        message: req.body,
        user: 'user'
    })
    newMessage.save().then(rec =>{ //return any record in msg collection 
        if(rec){
            res.send(rec);
        }
        else{
            res.send([]);
        }
    })
})


app.listen(3000, ()=> console.log('Listening on Port 3000'));
