const express = require('express')
const router = express.Router();
const db = require('../config/db'); // Adjust the path if needed
let myConnection;



router.get('/get-ingredient:id',(req,res) =>{

  try{
    const recipeId = req.params.id;
    
    console.log('recipeId' , recipeId);
    res.status(200).send(recipeId);

  }
  catch(error){
    res.status(400).send(error.message)
    console.error("Error inserting data:", error);
  }

 })

module.exports = router;