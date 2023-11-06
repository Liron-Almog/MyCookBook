const express = require('express');
const router = require('./routes/recipes');

const app = express();
const jwt = require('jsonwebtoken');
const ingredientRouter = require('./routes/ingredients')
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
app.use('/ingredients',ingredientRouter)
app.use('/login',loginRouter)
app.use('/register',registerRouter)
app.listen(PORT)


function authorization(req, res, next) {

    if(req.cookies.token === undefined){
      res.status(401);
      return;
    }
   
    const token = JSON.parse(req.cookies.token).token
    const secretKey = 'qqwewdxc'
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
          res.status(401);
        } else {
          next(); // Continue processing the request
        }
      });

  }