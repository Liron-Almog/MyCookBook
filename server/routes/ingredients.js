const express = require('express')
const ingredientRouter = express.Router();
const db = require('../utilities/db'); // Adjust the path if needed
let myConnection;


ingredientRouter.get('/get-ingredient/:id',async (req,res) =>{

  try {
    myConnection = await db.connect();
    const recipeId = req.params.id;
    
    if (!recipeId) 
      throw new Error('Recipe ID is missing');

    const [data] = await myConnection.execute(`SELECT description,quantity,unit FROM recipe_management.ingredients WHERE recipe_id = ${recipeId}`);
    
    res.status(200).send(data);

  } catch (err) {
    res.status(400).send(err.message);
  }
 })

  async function addIngredient(ingredients,recipeId) {
  try { 
    myConnection = await db.connect();

    const insertQuery = `INSERT INTO ingredients (recipe_id, description, quantity, unit) VALUES (?, ?, ?, ?);`;

    for (let element of ingredients) {
      const values = [recipeId, element.ingredient, element.quantity, element.type];
      await myConnection.execute(insertQuery, values);
    }

  } catch (error) {
    throw new Error('Can not add the ingredients');
  }
}

 async function deleteIngredient(id){

  myConnection = await db.connect();

   try {
       await myConnection.execute(`DELETE FROM recipe_management.ingredients WHERE recipe_id = ${id}`);
     } catch (err) {
       throw new Error('Can not deletes the ingredients');
     }
}


module.exports = {
  ingredientRouter,
  addIngredient,
  deleteIngredient,
};
