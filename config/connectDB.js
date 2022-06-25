const mongoose = require("mongoose")
const URI = "mongodb+srv://ines:PvAAZPY46YniEmMP@cluster1.6dymutc.mongodb.net/?retryWrites=true&w=majority";
const connect = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Connected Successfully to the Database");
  } catch {
    console.log("Failed to connect to the Database!")
  }
}
module.exports = connect