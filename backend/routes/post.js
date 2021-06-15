const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');
const Post = mongoose.model("Post");


//list all the posts
router.get('/all-posts', (req, res) => {
    Post.find()
        .populate("postedBy", "_id name")
        //we won't get the password since we said we only need the id, name and email
        .then((posts) => {
            res.json({posts});
        })
        .catch(err => {
            console.log(err);
        })
})

//make a post
//include different routes later for mobile app and for web app (only let users post from the mobile app not from web app)
router.post('/create-post', requireLogin, (req, res) => {
    const { title, body } = req.body;
    if (!title || !body){
        return res.status(422).json({error: "Fields missing"});
    }
    req.user.password = undefined;
    const post = new Post({
        title,
        body,
        postedBy: req.user
    });
    post.save().then(result => {
        res.json({post:result})
    })
        .catch(err => {
            console.log(err);
        })
}) 

//list all the posts by the user
router.get('/my-post', requireLogin, (req, res) => {
    Post.find({postedBy: req.user._id})
        .populate("postedBy", "_id name")
        .then(myPost => {
            res.json({myPost});
        })
        .catch(err => {
            console.log(err);
        })
})


module.exports = router;