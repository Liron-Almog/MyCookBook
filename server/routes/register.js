const express = require('express');
const router = express.Router();
const db = require('../utilities/db'); // Adjust the path if needed
const AuthValidator = require('../utilities/validator');
let myConnection;

// Route to handle user registration
router.post('/', async (req, res) => {
  try {
    // Create an instance of AuthValidator for input validation
    const validator = new AuthValidator();

    // Destructure values from the request body
    let { email, password, confirmPassword } = req.body;

    // Validate input using AuthValidator methods
    if (
      validator.isEmpty(email, password, confirmPassword) ||
      !validator.isEmail(email) ||
      validator.arePasswordsEqual(password, confirmPassword)
    ) {
      throw new Error(validator.getMessage());
    }

    // Connect to the database
    myConnection = await db.connect();

    // Check if the email is already in use
    const [userData] = await myConnection.execute(`SELECT email FROM recipe_management.users WHERE email = ?`, [email]);
    if (userData.length > 0) {
      throw new Error('The email is already in use');
    }

    // Insert the user into the database
    await myConnection.execute(`INSERT INTO recipe_management.users (email, password) VALUES ('${email}', '${password}')`);

    // Respond with a success message if everything is executed successfully
    res.status(200).json({ message: 'Succeeded' });

  } catch (err) {
    // Catch and handle errors, sending a 400 status with the error message
    res.status(400).send([err.message]);
  }
});

// Export the router for use in other parts of the application
module.exports = router;
