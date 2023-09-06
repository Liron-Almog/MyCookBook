const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Adjust the path if needed
const { deleteIngredient, addIngredient } = require('../utilities'); // Import the deleteIngredient function

let myConnection;

(async () => {
  try {
    myConnection = await db.connect();
    // Use myConnection for your database operations;
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();

router.get('/get-items', async (req, res) => {
  try {
    const [rows] = await myConnection.execute('SELECT * FROM recipe_management.recipes');
    res.status(200).send(rows);
  } catch (err) {
    res.status(400).sendStatus(err);
    console.log(err);
  }
});

router.post('/add-recipe', async (req, res) => {
  try {
    myConnection = await db.connect();
    let { recipeName, preparationTime, description, servings, vegetarian, glutenFree, urlPhoto,ingredients} = req.body;
    glutenFree = glutenFree ? true : false;
    vegetarian = vegetarian ? true : false;

    console.log(recipeName, preparationTime, description, servings, vegetarian, glutenFree, urlPhoto);
    
    const insertQuery = `
      INSERT INTO recipes (user_id, recipe_name, preparation_time, description, servings, vegetarian, gluten_free, url_photo) VALUES (?, ?, ?, ?, ?, ?, ?, ?);
    `;
  
    const values = [1, recipeName, preparationTime, description, servings, vegetarian, glutenFree, urlPhoto];
    const [result] = await myConnection.execute(insertQuery, values);
    
    addIngredient(ingredients,result.insertId);

    res.status(200).send('');


  } catch (error) {
    // Handle error
    res.status(400).send(error);
    console.error("Error inserting data:", error);
  }
});

router.delete('/delete-item/:id', async (req, res) => {
  try {
    const recipeId = req.params.id;
    if (!recipeId) 
      throw new Error('Recipe ID is missing');

    await deleteIngredient(recipeId);
    await myConnection.execute(`DELETE FROM recipe_management.recipes WHERE recipe_id = ${recipeId}`);

    console.log('here');
    res.status(200).send('');
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
