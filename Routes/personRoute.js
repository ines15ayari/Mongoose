const express = require("express");
const router = express.Router();
const {
  getAllPersons,
  addPerson,
  createManyPeople,
  findByName,
  findOneByFood,
  getOnePerson,
  findEditSave,
  findByNameAndUpdate,
  findOneAndRemove,
  DeleteAllByName,
  chainSearchAndQuery } = require("../Controllers/personControllers");

router.get("/", getAllPersons); //To display all the persons added to the DB
router.get("/", findByName); //To display all the persons with the specified name
router.get("/", findOneByFood); // To display only one person with the specified food
router.get("/", getOnePerson); // To display the person with the specified id
router.get("/", chainSearchAndQuery); // To find all persons with favorite food burritos, sort them by name, limit result to 2, hide their age and display them.

router.post("/", addPerson); //To create a new person and save it to the database
router.post("/", createManyPeople); //To create many persons by entering an array of people 

router.put("/", findEditSave); //To find a person by id then add hamburger to its favorite foods
router.put("/", findByNameAndUpdate);//To find a person by name then set its age to 20

router.delete("/", findOneAndRemove); //To find a person by id and delete it
router.delete("/", DeleteAllByName); //To find all persons having a specified name and delete them from DB.


module.exports = router;
