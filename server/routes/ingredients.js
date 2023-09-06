const express = require('express')
const router = express.Router();
const db = require('../config/db'); // Adjust the path if needed
let myConnection;



router.get('/get-ingredient/:id',async (req,res) =>{


  try {
    myConnection = await db.connect();
    const recipeId = req.params.id;
    console.log(recipeId);
    
    if (!recipeId) 
      throw new Error('Recipe ID is missing');


    console.log(recipeId);
    const [data] = await myConnection.execute(`SELECT description,quantity,unit FROM recipe_management.ingredients WHERE recipe_id = ${recipeId}`);
    
    res.status(200).send(data);

  } catch (err) {
    res.status(400).send(err.message);
  }
 })

module.exports = router;