const express = require('express')
const router = express.Router();
const db = require('../config/db'); // Adjust the path if needed
const AuthValidtor = require('../validators/AuthValidator')
let myConnection;

router.post('/',async (req,res) =>{

  try {

    const validator = new AuthValidtor();
    let { email, password, confirmPassword} = req.body;

    if(validator.isEmpty(email,password,confirmPassword) ||  !validator.isEmail(email) || validator.arePasswordsEqual(password,confirmPassword))
      throw new Error(validator.getMessage());
  
    myConnection = await db.connect();
    [userData] = await myConnection.execute(`SELECT email FROM recipe_management.users WHERE email = ?`, [email]);
    if (userData.length > 0) 
        throw new Error('The email is already in use');
    
    await myConnection.execute(`INSERT INTO recipe_management.users (email, password) VALUES ('${email}', '${password}')`);

    res.status(200).json({ message: 'Succeeded' });


  } catch (err) {
    res.status(400).send([err.message]);
  }
 })

module.exports = router;