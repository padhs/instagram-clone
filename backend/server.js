const express = require('express');
const app = express();
const PORT = 5000;
const mongoose = require('mongoose');


//db config
const { mongoUri } = require('./keys')
mongoose.connect(mongoUri, {useNewUrlParser: true, useUnifiedTopology: true}, () => {
    console.log('db connected');
});


//api routes


//middleware
require('./models/user');
require('./models/post');

app.use(express.json());
app.use(require('./routes/auth'));
app.use(require('./routes/post'));

app.listen(PORT , () => {
    console.log(`listening on ${PORT}`);
});


//validation