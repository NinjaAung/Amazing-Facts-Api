const express = require('express');
const Post = require('../models/post')
const router = express.Router();


router.get('/', async (req, res) => { 
    try{
        const posts = await Post.find({}); // Recieve all posts
        res.json(posts)
    } catch (err) {
        res.json({message: err})
    }

});


router.post('/', async (req, res) => { 
    const post = new Post({ // Add a post
        fact: req.body.fact
    });
    try{
        const savedPost = await post.save();
        res.json(savedPost);
    } catch (err) {
        res.json({message: err})
    }
});

module.exports = router;