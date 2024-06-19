require("dotenv").config();
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const Person = require("./models/Person");

const createAndSavePerson = () => {
  const person = new Person({
    name: "John Doe",
    age: 25,
    favoriteFoods: ["Pizza", "Burger"],
  });

  person.save((err, data) => {
    if (err) return console.error(err);
    console.log(data);
  });
};

createAndSavePerson();

// many record

const arrayOfPeople = [
  { name: "Jane Doe", age: 22, favoriteFoods: ["Sushi", "Pasta"] },
  { name: "Mike Smith", age: 30, favoriteFoods: ["Steak", "Salad"] },
  { name: "Mary Johnson", age: 28, favoriteFoods: ["Pizza", "Tacos"] },
];

Person.create(arrayOfPeople, (err, people) => {
  if (err) return console.error(err);
  console.log(people);
});

// find all

const findPeopleByName = (name) => {
  Person.find({ name: name }, (err, people) => {
    if (err) return console.error(err);
    console.log(people);
  });
};

findPeopleByName("John Doe");

// find one

const findOneByFavoriteFood = (food) => {
  Person.findOne({ favoriteFoods: food }, (err, person) => {
    if (err) return console.error(err);
    console.log(person);
  });
};

findOneByFavoriteFood("Pizza");

// find by id

const findPersonById = (personId) => {
  Person.findById(personId, (err, person) => {
    if (err) return console.error(err);
    console.log(person);
  });
};

// Replace 'personId' with a valid id
findPersonById("personId");

// find and update

const findEditThenSave = (personId) => {
  Person.findById(personId, (err, person) => {
    if (err) return console.error(err);
    person.favoriteFoods.push("hamburger");
    person.save((err, updatedPerson) => {
      if (err) return console.error(err);
      console.log(updatedPerson);
    });
  });
};

// Replace 'personId' with a valid id
findEditThenSave("personId");

// find and update

const findAndUpdate = (personName) => {
  Person.findOneAndUpdate(
    { name: personName },
    { age: 20 },
    { new: true },
    (err, updatedPerson) => {
      if (err) return console.error(err);
      console.log(updatedPerson);
    }
  );
};

findAndUpdate("John Doe");

// delete one

const removeById = (personId) => {
  Person.findByIdAndRemove(personId, (err, removedPerson) => {
    if (err) return console.error(err);
    console.log(removedPerson);
  });
};

// Replace 'personId' with a valid id
removeById("personId");

// delete many

const removeManyPeople = (name) => {
  Person.remove({ name: name }, (err, response) => {
    if (err) return console.error(err);
    console.log(response);
  });
};

removeManyPeople("Mary Johnson");

// Chain Search Query Helpers to Narrow Search Results

const queryChain = (food) => {
  Person.find({ favoriteFoods: food })
    .sort({ name: 1 })
    .limit(2)
    .select("-age")
    .exec((err, data) => {
      if (err) return console.error(err);
      console.log(data);
    });
};

queryChain("Pizza");
