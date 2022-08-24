const express = require("express");
const serverless = require("serverless-http");
const mongoose = require('mongoose');
const app = express();
const router = express.Router();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('dotenv').config();
const mongoString = process.env.DATABASE_URL;
const Post = require('./models/post.model');

mongoose.connect(mongoString);
const database = mongoose.connection;
database.on('error', (error) => {
    console.log(error)
})
database.once('connected', () => {
    console.log('Database Connected');
})

//Get all Method
router.get('/getAllPosts', (req, res, callback) => {
    try{
        Post.find({}, (err, posts) => { 
            if (err){
                res.status(500).json({message: err.message})
            } 
            res.json({
                posts: posts
            })  
        })
    }
    catch(err){
        next(err)
        //res.status(500).json({message: error.message})
    }
});
  
  //Get by ID Method
router.get('/getPost/:title', async (req, res) => {
    Post.findOne({ title: req.params.title }, (err, post) => { 
        if (err){
            res.status(500).json({message: err.message})
        res.json({
            title: post.title,
                content: post.content
            })
        }
    })
});

app.use('/.netlify/functions/api', router);
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../../dist/index.html')));

module.exports = app;
module.exports.handler = serverless(app);