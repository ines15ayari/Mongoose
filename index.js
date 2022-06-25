const express = require("express");
let mongoose = require("mongoose");
const app = express();
const connect = require("./config/connectDB");
const personRouter = require("./Routes/personRoute");

//middleware global
app.use(express.json());

const PORT = 2000 || process.env.PORT; //specifying the port
app.listen(PORT, (e) => {
  if (e) {
    console.log("error on server"); //if there is an error
  } else {
    console.log(`server is running on port ${PORT}`); //if everything is okay display this message with the port number
  }
});
connect(); //To connect to the DB 
app.use("/api", personRouter); 


