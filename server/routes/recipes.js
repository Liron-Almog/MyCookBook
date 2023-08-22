const express = require('express')
const router = express.Router();

const recipes = [
    {
      id: 1,
      name: "Spaghetti Carbonara",
      preparationTime: "10:15:00",
      cookingTime: "10:30:00",
      description: "A classic Italian pasta dish with eggs, cheese, and pancetta."
    },
    {
      id: 2,
      name: "Chicken Stir-Fry",
      preparationTime: "15:20:00",
      cookingTime: "15:40:00",
      description: "A quick and delicious stir-fry recipe with chicken and vegetables."
    },
    {
      id: 3,
      name: "Chocolate Cake",
      preparationTime: "20:30:00",
      cookingTime: "30:45:00",
      description: "Indulge in a rich and moist chocolate cake."
    }
  ];
  

router.get('/get-items',(req,res) =>{
    res.send(recipes)
})

module.exports = router;