const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userHandle:{
        type: String,
        required: true
    },
    fullName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
});

mongoose.model("user", userSchema);