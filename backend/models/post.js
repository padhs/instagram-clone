const mongoose = require('mongoose');
const objectId = mongoose.Schema.Types;


const postSchema = new mongoose.Schema({
    captions:{
        type: String,
        required: true
    },
    body:{
        type: String,
        required: true
    },
    photo:{
        type: String,
        default: "no photo"
    },
    postedBy:{
        type: objectId,
        ref:"user"
    }
})

mongoose.model('Post', postSchema);