const mongoose = require("mongoose"); //Loading the mongoose model
let validator = require("validator");//
//Defining the schema of the person
const personSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  favoriteFoods: {
    type: [String],
  },
});
module.exports = mongoose.model("person", personSchema);
