const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const Post = require('./models/post');

const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://dishu:Q61CxJv21FxqpI1M@cluster0-h5kbk.mongodb.net/node-angular?retryWrites=true&w=majority",  { useUnifiedTopology: true, useNewUrlParser: true }).then(()=> {
  console.log('connect to db');})
  .catch(()=>{
    console.log('connection failed')
  })
app.use( bodyParser.json());
app.use( bodyParser.urlencoded({ extended: false }));

app.use((req, res, next)=> {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", 
  "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  )
    next();
});

app.post("/api/posts", (req, res, next)=> {
  const post = new Post ({
    title: req.body.title,
    content: req.body.content
  })
  post.save().then(createdPost =>{
    res.status(201).json({
    message: 'Post Added Sucessfully',
    postId: createdPost._id
  });
  
  })
})

app.put("/api/posts/:id", (req, res, next)=> {
  const post =new Post ({
    _id: req.body._id,
    title: req.body.title,
    content: req.body.content
  })
  Post.updateOne({_id: req.params.id}, post).then(result => {
    console.log(result);
    res.status(200).json({message: "update successful!"});
  })
});


app.get('/api/posts' , (req, res, next) => {
   Post.find().then(documents => {
    // console.log(documents);
      res.status(200).json({ // for the success 
      message: ' Posts fetched Succesfully',
      posts: documents
      });
  });
    
});

app.delete("/api/posts/:id", (req, res, next)=>{
  //console.log(req.params.id);
  Post.deleteOne({ _id: req.params.id }).then(result=> {
    console.log(result);
    res.status(200).json({ message: "Post Deleted"});
  })
  
})

module.exports = app;