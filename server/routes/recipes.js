const express = require('express');
const recipeRouter = express.Router();
const db = require('../utilities/db'); // Adjust the path if needed
const { deleteIngredient, addIngredient } = require('../routes/ingredients'); // Import the deleteIngredient function
const myValidtor = require('../utilities/validator')
let myConnection;

(async () => {
  try {
    myConnection = await db.connect();
    // Use myConnection for your database operations;
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();

recipeRouter.get('/get-items', async (req, res) => {


  try {
    const [rows] = await myConnection.execute(`SELECT * FROM recipe_management.recipes where user_id='${req.userId}'`);
    console.log(rows);
    res.status(200).send(rows);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

recipeRouter.post('/add-recipe', async (req, res) => {

  try {

    myConnection = await db.connect();
    let { recipeName, preparationTime, description, servings, vegetarian, glutenFree, urlPhoto,ingredients} = req.body;
    glutenFree = glutenFree ? true : false;
    vegetarian = vegetarian ? true : false;
    
    const validator = new myValidtor();

    if(validator.isEmpty(recipeName, preparationTime, description, servings, vegetarian, glutenFree, urlPhoto)){
      throw new Error(validator.getMessage());
    }
    const insertQuery = `
      INSERT INTO recipes (user_id, recipe_name, preparation_time, description, servings, vegetarian, gluten_free, url_photo) VALUES (?, ?, ?, ?, ?, ?, ?, ?);
    `;
  
    const values = [1, recipeName, preparationTime, description, servings, vegetarian, glutenFree, urlPhoto];
    const [result] = await myConnection.execute(insertQuery, values);
    
    addIngredient(ingredients,result.insertId);

    res.status(200).send('');

  } catch (err) {
    res.status(400).send(err.message);
  }
});

recipeRouter.delete('/delete-item/:id', async (req, res) => {
  try {
    const recipeId = req.params.id;
    if (!recipeId) 
      throw new Error('Recipe ID is missing');

    await deleteIngredient(recipeId);
    await myConnection.execute(`DELETE FROM recipe_management.recipes WHERE recipe_id = ${recipeId}`);

    res.status(200).send('');
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = recipeRouter;
