const express = require('express');
const recipeRouter = express.Router();
const db = require('../utilities/db'); // Adjust the path if needed
const { deleteIngredient, addIngredient } = require('../routes/ingredients'); // Import the deleteIngredient function
const myValidator = require('../utilities/validator')
let myConnection;

// Immediately-invoked function expression to establish a database connection
(async () => {
  try {
    // Connect to the database and store the connection in myConnection
    myConnection = await db.connect();
    // Use myConnection for your database operations;
  } catch (error) {
    // Log an error message if connection fails
    console.error('An error occurred:', error);
  }
})();

// Route to get recipes associated with a user
recipeRouter.get('/get-items', async (req, res) => {
  try {
    // Fetch recipes for the specified user ID
    const [rows] = await myConnection.execute(`SELECT * FROM recipe_management.recipes where user_id='${req.userId}'`);
    console.log(rows); // Log fetched recipes to the console
    res.status(200).send(rows);
  } catch (err) {
    // Catch and handle errors, sending a 400 status with the error message
    res.status(400).send(err.message);
  }
});

// Route to add a new recipe
recipeRouter.post('/add-recipe', async (req, res) => {
  try {
    // Connect to the database
    myConnection = await db.connect();

    // Destructure values from the request body
    let { recipeName, preparationTime, description, servings, vegetarian, glutenFree, urlPhoto, ingredients } = req.body;
    glutenFree = glutenFree ? true : false;
    vegetarian = vegetarian ? true : false;

    // Create an instance of myValidator for input validation
    const validator = new myValidator();

    // Validate input fields using the validator
    if (validator.isEmpty(recipeName, preparationTime, description, servings, vegetarian, glutenFree, urlPhoto)) {
      throw new Error(validator.getMessage());
    }

    // SQL query to insert a new recipe into the database
    const insertQuery = `
      INSERT INTO recipes (user_id, recipe_name, preparation_time, description, servings, vegetarian, gluten_free, url_photo) VALUES (?, ?, ?, ?, ?, ?, ?, ?);
    `;

    // Values to be inserted into the recipes table
    const values = [1, recipeName, preparationTime, description, servings, vegetarian, glutenFree, urlPhoto];

    // Execute the insert query
    const [result] = await myConnection.execute(insertQuery, values);

    // Call the addIngredient function to associate ingredients with the new recipe
    addIngredient(ingredients, result.insertId);

    res.status(200).send('');

  } catch (err) {
    // Catch and handle errors, sending a 400 status with the error message
    res.status(400).send(err.message);
  }
});

// Route to delete a recipe by ID
recipeRouter.delete('/delete-item/:id', async (req, res) => {
  try {
    // Extract recipe ID from the request parameters
    const recipeId = req.params.id;

    // Check if recipeId is missing
    if (!recipeId) {
      throw new Error('Recipe ID is missing');
    }

    // Call deleteIngredient to remove associated ingredients
    await deleteIngredient(recipeId);

    // Delete the recipe from the recipes table
    await myConnection.execute(`DELETE FROM recipe_management.recipes WHERE recipe_id = ${recipeId}`);

    res.status(200).send('');
  } catch (err) {
    // Catch and handle errors, sending a 400 status with the error message
    res.status(400).send(err.message);
  }
});

// Export the router for use in other parts of the application
module.exports = recipeRouter;
