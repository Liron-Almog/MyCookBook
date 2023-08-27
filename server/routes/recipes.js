const express = require('express')
const router = express.Router();
const db = require('../config/db'); // Adjust the path if needed





const recipes = [
    {
      id: 1,
      name: "Spaghetti Carbonara",
      preparationTime: "10:15:00",
      ingredients: 12,
      description: "A classic Italian pasta dish with eggs, cheese, and pancetta.",
      // servings: 4,
      // vegetarian: false,
      // glutenFree: false,
    },
    {
      id: 2,
      name: "Chicken Stir-Fry",
      preparationTime: "15:20:00",
      ingredients: 12,
      description: "A quick and delicious stir-fry recipe with chicken and vegetables."
    },
    {
      id: 3,
      name: "Chocolate Cake",
      preparationTime: "20:30:00",
      ingredients: 12,
      description: "Indulge in a rich and moist chocolate cake."
    }
    ,
    {
      id: 4,
      name: " Cake",
      preparationTime: "20:30:00",
      ingredients: 12,
      description: "Indulge in a rich and moist chocolate cake."
    }
  ];
  

router.get('/get-items', async (req,res) =>{

  try{
    const connection =  db.connect();
    // const [data] = await connection.query('SELECT * FROM recipes');
    //console.log(connection);
  }
  catch(err){
    console.log(err);
  }

   res.status(200).send(recipes);
})

router.post('/add-recipe',(req,res) =>{

  const {recipeName,preparationTime,description} = req.body;

  if(!recipeName || !preparationTime || !description)
    res.status(404).send();

  res.status(200).send()
})

router.delete('/delete-item/:id',(req,res) =>{
  const itemId = req.params.id;
  console.log(itemId);
  res.status(200).send()

})
module.exports = router;