const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const postsRoutes = require('./routes/posts')

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

app.use("/api/posts",postsRoutes)
module.exports = app;