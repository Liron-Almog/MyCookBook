const express = require('express');
const router = require('./routes/recipes');
const app = express();
const recipeRouter = require('./routes/recipes');
const cors = require('cors');
const PORT = 3000;
app.use(cors());

app.get('/',(req,res,next)=>{
 res.send('sss')
})


app.use('/recipes',recipeRouter)


app.listen(PORT)