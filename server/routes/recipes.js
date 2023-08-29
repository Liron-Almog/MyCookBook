const express = require('express')
const router = express.Router();
const db = require('../config/db'); // Adjust the path if needed
let myConnection;

(async () => {
  try {
    myConnection = await db.connect();
    // Use myConnection for your database operations;
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();

router.get('/get-items', async (req,res) =>{

  
  try{
    const [rows] = await myConnection.execute('SELECT * FROM recipe_management.recipes');
    res.status(200).send(rows);
  }
  catch(err){
    res.status(400).sendStatus(err)
    console.log(err);
  }
})

router.post('/add-recipe',(req,res) =>{

  const {recipeName,preparationTime,description} = req.body;

  if(!recipeName || !preparationTime || !description)
    res.status(404).send();

  res.status(200).send()
})

router.delete('/delete-item/:id', async (req, res) => {
  try {
    const recipeId = req.params.id;
    if (!recipeId) 
      throw new Error('Recipe ID is missing');

    await myConnection.execute(`DELETE FROM recipe_management.recipes WHERE recipe_id = ${recipeId}`);
    console.log('here');
    res.status(200).send('');
  } catch (err) {
    res.status(400).send(err.message);
  }
});
module.exports = router;