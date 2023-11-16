const express = require('express');
const ingredientRouter = express.Router();
const db = require('../utilities/db'); // Adjust the path if needed
let myConnection;

// Route to get ingredients for a specific recipe ID
ingredientRouter.get('/get-ingredient/:id', async (req, res) => {
  try {
    // Connect to the database
    myConnection = await db.connect();
    const recipeId = req.params.id;

    // Check if recipeId is missing
    if (!recipeId) {
      throw new Error('Recipe ID is missing');
    }

    // Fetch ingredients for the specified recipe ID
    const [data] = await myConnection.execute(`SELECT description, quantity, unit FROM recipe_management.ingredients WHERE recipe_id = ${recipeId}`);

    // Send the fetched data as a response
    res.status(200).send(data);

  } catch (err) {
    // Catch and handle errors, sending a 400 status with the error message
    res.status(400).send(err.message);
  }
});

// Function to add ingredients for a specific recipe ID
async function addIngredient(ingredients, recipeId) {
  try {
    // Connect to the database
    myConnection = await db.connect();

    // SQL query to insert ingredients
    const insertQuery = `INSERT INTO ingredients (recipe_id, description, quantity, unit) VALUES (?, ?, ?, ?);`;

    // Loop through each ingredient and insert into the database
    for (let element of ingredients) {
      const values = [recipeId, element.ingredient, element.quantity, element.type];
      await myConnection.execute(insertQuery, values);
    }

  } catch (error) {
    // Throw an error if there's an issue adding ingredients
    throw new Error('Can not add the ingredients');
  }
}

// Function to delete ingredients for a specific recipe ID
async function deleteIngredient(id) {
  // Connect to the database
  myConnection = await db.connect();

  try {
    // Execute SQL query to delete ingredients for the specified recipe ID
    await myConnection.execute(`DELETE FROM recipe_management.ingredients WHERE recipe_id = ${id}`);
  } catch (err) {
    // Throw an error if there's an issue deleting ingredients
    throw new Error('Can not delete the ingredients');
  }
}

// Export the router and functions for use in other parts of the application
module.exports = {
  ingredientRouter,
  addIngredient,
  deleteIngredient,
};
