const express = require('express');
const router = require('./routes/recipes');
const app = express();
const recipeRouter = require('./routes/recipes');

app.get('/',(req,res,next)=>{
 res.send('sss')
})




app.use('/recipes',recipeRouter)


app.listen(3000)