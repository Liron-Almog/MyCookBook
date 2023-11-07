const express = require('express');

const app = express();
const {authorization} = require('./middleware/authrization')
const {ingredientRouter} = require('./routes/ingredients')
const recipeRouter = require('./routes/recipes');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');

const cookieParser = require('cookie-parser');
const cors = require('cors');
const PORT = 3000;

app.use(express.json());
app.use(cookieParser());
const corsOptions = {
  origin: 'http://localhost:4200', 
  credentials: true, // Allow credentials (e.g., cookies)
};

app.use(cors(corsOptions));
app.use('/recipes',authorization,recipeRouter)
app.use('/ingredients',authorization,ingredientRouter)
app.use('/login',loginRouter)
app.use('/register',registerRouter)
app.listen(PORT)
