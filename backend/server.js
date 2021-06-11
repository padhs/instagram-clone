const cors = require("cors")
const express = require("express");
//const mongoose = require('mongoose')

//app configs
const app = express();
const port = process.env.PORT || 3000;

//const pusher = new Pusher({})

//middlewares
app.use(express.json());
app.use(cors);

//db config
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://padhs:vpFu%pq9jf$BR@@cluster0.bi0tb.mongodb.net/instagram-db?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(() => {
    console.log('db connected');
});
// client.close(() => {
//     console.log("db connection terminated");
// })
//api routes
app.get("/", (req, res) => {
    res.status(200).send("Hello World!");
});
//listeners
app.listen(port, () => console.log(`listening on localhost:${port}`));
