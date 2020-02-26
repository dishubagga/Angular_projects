const express = require('express');
const app = express();



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