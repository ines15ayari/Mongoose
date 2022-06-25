const { default: mongoose } = require("mongoose");
const Person = require("../Models/Person"); //importing the Person model

//Display the list of all persons existing in the DB
const getAllPersons = async (req, res) => {
  const persons = await Person.find();
  try {
    if (persons.length === 0) {//if DB is empty
      res.status(200).json({ msg: "your database is empty" });
    } else {
      res.status(200).json({ persons }); //display the persons in the DB
    }
  } catch {
    res.status(400).json({ msg: "failed to get all persons" }); //if error
  }
};

//Creating a person using the person schema model 
const addPerson = async (req, res) => {

  const person = req.body;
  const searchedPerson = await Person.findOne({
    name: person.name,
    age: person.age,
    favoriteFoods: person.favoriteFoods,
  });
  try {
    if (searchedPerson) {  //This will check if the created person already exist in the DB
      res.status(401).json({ msg: "person already exist" });
    } else {
      console.log("hello")
      const newPerson = new Person({ //if the created person does not exist in the DB it will add it as a newPerson
        name: person.name,
        age: person.age,
        favoriteFoods: person.favoriteFoods,
      });
      newPerson.save() //to save the newPerson added in the Database
      res.status(200).json({ msg: "person added successfully" }); //a message to confirm that the personis added successfully
    }
  } catch {
    res.Status(400).json({ msg: "saving failed" }); //if there was a problem when creating the newPerson it will print "saving failed"
  }
};

//Creating an instance of a Person
let p1 = new Person({
  name: 'Ines',
  age: 23,
  favoriteFoods: ["Pizza", "Lasagne"],
})
//saving the first person
p1
  .save()
  .then((doc) => {
    console.log(doc);
  })
  .catch((err) => {
    console.error(err);
  });

console.log(p1)

//The array of people to add to the DB
let arrayOfPeople = [
  {
    name: "Amine",
    age: 14,
    favoriteFoods: ["Spaghetti", "Burgers"],
  },
  {
    name: "Molka",
    age: 17,
    favoriteFoods: ["Salads"]
  }, {
    name: "Yassine",
    age: 34,
    favoriteFoods: ["Couscouss", "Pasta", "Kafteji"]
  }
];

//Creating Many persons
var createManyPeople = function (arrayOfPeople, done) {
  Person.create(arrayOfPeople, function (err, data) {
    if (err) {
      done(err)
    }
    else {
      done(null, data)
    }
  })
}

//Find a person with the name
const findByName = async (req, res) => {
  const person = req.body //getting the name that we are searching for
  const searchedPerson = await Person.find({
    name: person.name   // search query
  })
    .then(doc => {
      console.log(doc) //printing all the docs having the searched name
    })
    .catch(err => {
      console.error(err) //printing error if doc is not found or if an error occured
    })
}

//Find just one person with the favorite food
const findOneByFood = async (req, res) => {
  const person = req.body //getting the favorite food that we are searching for
  const searchedPerson = await Person.findOne({
    favoriteFoods: person.favoriteFoods   // search query
  })
    .then(doc => {
      console.log(doc) //printing the doc having the searched favorite food
    })
    .catch(err => {
      console.error(err) //printing error if doc is not found or if an error occured
    })
}

//To display the person with the specified id
const getOnePerson = async (req, res) => {
  const personId = req.params.id; //get the id of the person
  try {
    const person = await Person.findById(id); //find the person by the specified id
    res.status(200).json({ person }); //print the person if everything is okay
  } catch {
    res.status(400).json({ msg: "failed to get one person" }); //if error
  }
};

//To find a person by id then add hamburger to its favorite foods
const findEditSave = async (req, res) => {
  const item = "hamburger"; //item to be added to the person's favorite foods list
  const personId = req.params.id; //get the id of the person we are searching for
  try {
    const person = await Person.findById(id); //find the person by its id
    res.status(200).json({ person }); //printing the person if everything is okay
  } catch {
    res.status(400).json({ msg: "failed to get one person" }); //printing error if there is no such person or if there is an error
  }
  person.favoriteFoods.push(item) //add hamburger to the person's favorite food
  person.save(function (err, data) { //save the person to the DB
    if (err) {
      return done(err) //if error
    }
    else {
      return done(null, data) //print the modified data
    }
  })
}


//To find a person by name then set its age to 20
const findByNameAndUpdate = async (req, res) => {
  const age = 20; //age to be set
  const name = req.params.name; //getting the name of the person that we want to set its age to 20
  const person = Person.findOneAndUpdate({ name: personName }, { age: 20 }, { new: true }, function (err, data) { //find the person by name and set its age to 20
    if (err) {
      return console.log("There is an error!"); //if there is an error print this message
    } else {
      console.log(person) //printing the person that we modified
    }
  })
}

//To find a person by id and delete it
const findOneAndRemove = async (req, res) => {
  const personId = req.params.id; //Getting the id of the person that we're gonna delete
  Person.findByIdAndRemove(personId, function (err, docs) {
    if (err) {
      console.log(err) //Printing error if there is no such person with the specified id or if there is an error
    }
    else {
      console.log(docs); //Printing the data deleted
    }
  })
}

//To find all persons having a specified name and delete them from DB.
const DeleteAllByName = async (req, res) => {
  const nameToRemove = req.body; //getting the name 
  const person = Person.remove({ name: nameToRemove }, function (err, data) {// removing persons with the specified name
    if (err) {
      return done(err) //Printing error if there is no such person with the specified name or if there is an error
    }
    else {
      return done(null, data) //Printing the data 
    }
  })
}

// To find all persons with favorite food burritos, sort them by name, limit result to 2, hide their age and display them.
const chainSearchAndQuery = async (req, res) => {
  const persons = Person.find({ favoriteFoods: { $contains: "burritos" } }) //find persons with burritos as favorite food
    .sort({ name: 1 }) //sort persons by name
    .limit(2) //limit result to just 2 persons
    .select({ name: true }, { favoriteFoods: true }) //select only name and favorite food to be displayed without the age
    .exec(function (err, data) { //execute the function
      if (err) {
        done(err) //printing error if there is no such person or if there is an error
      }
      else {
        done(null, data) // printing the data to be displayed
      }
    })
}

//exporting all the functions to be used
module.exports = { getAllPersons, addPerson, createManyPeople, findByName, findOneByFood, getOnePerson, findEditSave, findByNameAndUpdate, findOneAndRemove, DeleteAllByName, chainSearchAndQuery };
