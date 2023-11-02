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
app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true,
  }));

app.use('/recipes',recipeRouter)
app.use('/ingredients',ingredientRouter)
app.use('/login',loginRouter)
app.use('/register',registerRouter)
app.listen(PORT)


function authorization(req, res, next) {

    // const token = JSON.parse(req.cookies.token).token
    // const secretKey = 'qqwewdxc'
    // console.log(token);
    // jwt.verify(token, secretKey, (err, decoded) => {
    //     if (err) {
    //       res.status(200).sent('');
    //     } else {
    //       next(); // Continue processing the request
    //     }
    //   });

  }