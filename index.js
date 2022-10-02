const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    // insert many items in the database
     Recipe.insertMany(data)
      .then(recipe => console.log(`recipe is saved and its title is: `, recipe));
    // find one item and update it
    Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'},{ duration: 100 })
      .then(recipe => console.log('recipe was found and duration has been updated', recipe))
    // delete one item from the database
    Recipe.deleteOne({title: 'Carrot Cake'})
      .then(recipe => console.log('carrot has been deleted', recipe));
   })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });