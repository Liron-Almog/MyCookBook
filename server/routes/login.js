const express = require('express')
const router = express.Router();
const db = require('../config/db'); // Adjust the path if needed
const loginValidtor = require('../validators/loginValidator')
let myConnection;



router.post('/',async (req,res) =>{

  try {

    const validator = new loginValidtor();
    let { email, password} = req.body;

    if (email.length === 0 || password.length === 0)
      throw new Error('The password or email is not correct');

    myConnection = await db.connect();
    const [passwordForDB] = await myConnection.execute(`SELECT password FROM recipe_management.users where email='${email}'`);
   
   if (passwordForDB.length === 0)
      throw new Error('The password or email is not correct');
   
  
    const userPassword = passwordForDB[0].password;
    validator.comparePasswords(password,userPassword)
  
    if(validator.getMessages().length > 0){
      res.status(400).send(validator.getMessages());
      return;
    }

    
    res.status(200).send('');

  } catch (err) {
    res.status(400).send([err.message]);
  }
 })

module.exports = router;