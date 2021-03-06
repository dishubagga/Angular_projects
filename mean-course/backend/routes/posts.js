const express = require('express');


const Post = require('../models/post');
const router = express.Router();

const checkAuth = require("../middleware/check-auth");

router.post("",checkAuth, (req, res, next)=> {
  const post = new Post ({
    title: req.body.title,
    content: req.body.content
  })
router.save().then(createdPost =>{
    res.status(201).json({
    message: 'Post Added Sucessfully',
    postId: createdPost._id
  });
  
  })
})

router.put("/:id", checkAuth, (req, res, next)=> {
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

router.get('' , (req, res, next) => {
    console.log("get");
   Post.find().then(documents => {
    // console.log(documents);
      res.status(200).json({ // for the success 
      message: ' Posts fetched Succesfully',
      posts: documents
      });
  });
    
});

router.delete("/:id", checkAuth, (req, res, next)=>{
  //console.log(req.params.id);
  Post.deleteOne({ _id: req.params.id }).then(result=> {
    console.log(result);
    res.status(200).json({ message: "Post Deleted"});
  })
  
})
module.exports = router;