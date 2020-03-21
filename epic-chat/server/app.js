const express       = require('express');
const bodyParser    = require('body-parser');
const path          = require('path');
const app           = express();
const mongoose      = require('mongoose');
mongoose.connect('mongodb://localhost:27017/epicchat',{useNewUrlParser: true});
//these both are for web sockets
const server        = require('http').Server(app);
const io            = require('socket.io')(server);

io.on('connection', (socket)=>{
    let user = '';
 
    socket.on('new message', (data)=>{ //listen to new user event
        const newMessage = new Message({
            _id: mongoose.Types.ObjectId(),
            message: data,
            user: user
        })
        console.log(user + " is in user ");
        newMessage.save().then(rec =>{ //return any record in msg collection 
            if(rec){
                
                io.emit('message received', rec); // to send data to client again // instead of socket emit we will use io emit so that it can emit to everybody connected
            }
            else{
                
            }
        })

    })                 
    socket.on('new user', (data)=>{  // listen to new user event
        user    = data;
        console.log('new user connected');
        socket.broadcast.emit('user connected', data); //this will send event to everyone execpt that particular user who is connected
        Message.find().then(rec =>{ //return any record in msg collection 
            if(rec){
                socket.emit('all messages', rec)
            }
            else{
                
            }
        })

    })
    socket.on('disconnect', () => {
        socket.broadcast.emit('user disconnected', user);
    })
})


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
        message: req.body.message,
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


server.listen(3000, ()=> console.log('Listening on Port 3000'));
