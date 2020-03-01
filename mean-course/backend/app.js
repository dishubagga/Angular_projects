const express = require('express');
const app = express();

app.use((req, res, next)=> {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", 
  "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  )
    next();
});


app.use('/api/posts' , (req, res, next) => {
    const posts =   [
        { id: 'fshhsh123',
          title: 'First-Server-Side-Code',
          content: 'this is coming from server'
        },
        { id: '12fshhsh123',
          title: 'Second-Server-Side-Code',
          content: 'this is coming from server'
        }
    ];
    return res.status(200).json({ // for the success 
        message: ' Posts fetched Succesfully',
        posts: posts
    });

});

module.exports = app;