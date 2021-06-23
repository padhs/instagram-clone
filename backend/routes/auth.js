const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const user = mongoose.model('user');
const bcrypt = require('bcrypt');
const saltRounds = 15;
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../keys');


router.post('/signup', (req, res) => {
    const {userName, fullName, email, password} = req.body;
    if(!email || !password || !userName || !fullName){
        return res.status(422).json('please add all the fields');
    } else {
        console.log(req.body);
    }
    user.findOne({email:email})
        .then((savedUser) => {
        if (savedUser){
            return res.status(422).json({error: "user already exists with that email"})
        }
            bcrypt.hash(password, saltRounds).then(hashedPassword => {
                const user = new user({
                    name,
                    email,
                    password: hashedPassword
                });
                user.save()
                    .then(() => {
                        res.status(200).json({message:"saved successfully"});
                    })
                    .catch(err => {
                        console.log(err);
                    });
            })
    })
        .catch(err => {
            console.log(err);
        });
});

router.post('/login', (req, res) => {
    const {email, password} = req.body
    if (!email || !password) {
        res.status(422).json({error: "fields missing"});
    }
    user.findOne({email: email})
        .then((savedUser) => {
            if (!savedUser){
                return res.status(422).json({error: "invalid email or password"});
            }
            //if we have the user compare password
            bcrypt.compare(password, savedUser.password)
                .then(doMatch => {
                    if (doMatch){
                        // res.json({message: "logged in successfully"});
                        const userToken = jwt.sign({_id:savedUser._id}, JWT_SECRET)
                        const {_id, name, email } = savedUser;
                        res.json({token: userToken, user: {_id,name,email}});
                    } else {
                        return res.status(422).json({error: "invalid email or password"});
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        })

})

module.exports = router;
