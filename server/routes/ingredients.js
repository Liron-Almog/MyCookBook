const express = require('express')
const router = express.Router();
const db = require('../config/db'); // Adjust the path if needed
let myConnection;


router.post('/add',async(req,res) =>{

    myConnection = await db.connect();
    const ingredients = req.body;
    
    recipeId = 1;
    const insertQuery = `
    INSERT INTO ingredients (recipe_id, description, quantity, unit)VALUES (?, ?, ?, ?);`;
    
    try {
      
      for(let element of ingredients){
        const values = [4,element.ingredient,element.quantity, element.type];
        await myConnection.execute(insertQuery, values);
      }
      res.status(200).send('succeeded')
    }
     catch (error) {
      // Handle error
      res.status(400).send(error.message)
      console.error("Error inserting data:", error);
    }
    
})

router.get('/get-items',(req,res) =>{

  console.log('aa');
  // console.log(ingredients);
    res.status(200).send(ingredients);
 })

module.exports = router;