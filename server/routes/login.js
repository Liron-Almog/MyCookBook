const express = require('express')
const router = express.Router();
const db = require('../config/db'); // Adjust the path if needed
const AuthValidtor = require('../validators/AuthValidator')
const jwt = require('jsonwebtoken');


router.post('/',async (req,res) =>{

  try {
    let myConnection;
    const secretKey = 'qqwewdxc';
    const validator = new AuthValidtor();

    let { email, password} = req.body;

  
    if(validator.isEmpty(email,password))
      throw new Error(validator.getMessage());

    myConnection = await db.connect();
    const [passwordFormDB] = await myConnection.execute(`SELECT password FROM recipe_management.users where email='${email}'`);
   
   if (passwordFormDB.length === 0)
      throw new Error('The email is not correct');
   

    if(validator.arePasswordsEqual(password,passwordFormDB[0].password))
      throw new Error('The password is incorrect');
  
    if(validator.getMessage())
      throw new Error(validator.getMessage());
    
    const token = jwt.sign({email:email}, secretKey, { algorithm: 'HS256' });
    res.cookie('testCookie', 'testValue', { httpOnly: true, secure: false });


    res.status(200).send('');

  } catch (err) {
    res.status(400).send(err.message);
  }
 })

module.exports = router;