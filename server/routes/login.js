const express = require('express')
const router = express.Router();
const db = require('../utilities/db'); // Adjust the path if needed
const AuthValidtor = require('../utilities/validator')
const jwt = require('jsonwebtoken');


router.post('/',async (req,res) =>{

  try {
    let myConnection;
    const secretKey = 'qqwewdxc';
    const validator = new AuthValidtor();

    let { email, password} = req.body;

    if(validator.isEmpty(email,password) || !validator.isEmail(email))
      throw new Error(validator.getMessage());

    myConnection = await db.connect();
    const [passwordAndUserIdFormDB] = await myConnection.execute(`SELECT password,user_id FROM recipe_management.users where email='${email}'`);
   
    console.log(passwordAndUserIdFormDB);
    if (passwordAndUserIdFormDB.length === 0)
        throw new Error('The email is not correct');
   
    if(validator.arePasswordsEqual(password,passwordAndUserIdFormDB[0].password))
      throw new Error('The password is incorrect');
  
    if(validator.getMessage())
      throw new Error(validator.getMessage());
    
    const token = jwt.sign(passwordAndUserIdFormDB[0].user_id, secretKey, { algorithm: 'HS256' });
    res.status(200).json({ token: token}); // Send the JWT as a JSON response

  } catch (err) {
    res.status(400).send(err.message);
  }
 })

module.exports = router;