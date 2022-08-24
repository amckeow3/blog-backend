const express = require('express');
const router = express.Router();
const Post = require('../models/post.model');

//Get all Method
router.get('/getAllPosts', async (req, res) => {
  try{
    Post.find({}, (err, posts) => { 
      res.json({posts: posts})
    })
  }
  catch(error){
      res.status(500).json({message: error.message})
  }
});

//Get by ID Method
router.get('/getPost/:title', (req, res) => {
  Post.findOne({ title: req.params.title }, (err, post) => { 
    if (err){
      res.status(500).json({message: err.message})
    } else {
      res.json({
        title: post.title,
        content: post.content
      })
    }
  })
});

module.exports = router;