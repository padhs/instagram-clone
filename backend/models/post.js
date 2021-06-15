const mongoose = require('mongoose');
const objectId = mongoose.Schema.Types;


const postSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    body:{
        type: String,
        required: true
    },
    postedBy:{
        type: objectId,
        ref:"user"
    }
})

mongoose.model('Post', postSchema);