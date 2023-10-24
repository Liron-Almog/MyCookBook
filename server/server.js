const express = require('express');
const router = require('./routes/recipes');

const app = express();

const ingredientRouter = require('./routes/ingredients')
const recipeRouter = require('./routes/recipes');
const loginRouter = require('./routes/login');

const cors = require('cors');
const PORT = 3000;
app.use(cors());
app.use(express.json());


app.use('/recipes',recipeRouter)
app.use('/ingredients',ingredientRouter)
app.use('/login',loginRouter)
app.listen(PORT)