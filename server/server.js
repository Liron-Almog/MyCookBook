const express = require('express');
const router = require('./routes/recipes');

const app = express();

const ingredientRouter = require('./routes/ingredients')
const recipeRouter = require('./routes/recipes');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const PORT = 3000;

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use('/recipes',recipeRouter)
app.use('/ingredients',ingredientRouter)
app.use('/login',loginRouter)
app.use('/register',registerRouter)
app.listen(PORT)