const mongoose = require('mongoose')
require('dotenv').config();
const mongoURL =  process.env.MongoDBUrlocal;
console.log(mongoURL)
//const mongoURL = process.env.MongoDBUrl;
//SET UP THE MONGODB CONNECTION
mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log("MongoDB connection error:", err);
  });
//retrieve the default connection object, which represents the actual connection between mongodb server and node js server

const db = mongoose.connection; 
//now, define the event listeners
db.on('connected', () =>{
    console.log("your database is connected")
})
db.on('error', () =>{
    console.log("your database has connection error")
})
db.on('disconnected', () =>{
    console.log("your database is disconnected")
})

module.exports= db; //export the database connection object into the node js file,
//which u have to set up the connection with


