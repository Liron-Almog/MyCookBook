const express = require('express')
const router = express.Router();



router.post('/add',(req,res) =>{

    const ingredientsArray = req.body;
    console.log(ingredientsArray);


  res.status(200).send('a')
})

router.get('/get-items',(req,res) =>{
    res.status(200).send(ingredients);
 })

module.exports = router;