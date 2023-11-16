const express = require('express');
const router = express.Router();
const db = require('../utilities/db'); // Adjust the path if needed
const AuthValidator = require('../utilities/validator');
const jwt = require('jsonwebtoken');

router.post('/', async (req, res) => {
  try {
    // Create a variable to store the database connection
    let myConnection;

    // Secret key for JWT (adjust the value based on your requirements)
    const secretKey = 'qqwewdxc';

    // Create an instance of AuthValidator for input validation
    const validator = new AuthValidator();

    // Destructure values from the request body
    let { email, password } = req.body;

    // Validate input using AuthValidator methods
    if (validator.isEmpty(email, password) || !validator.isEmail(email)) {
      throw new Error(validator.getMessage());
    }

    // Connect to the database
    myConnection = await db.connect();

    // Fetch password and user_id from the database based on the provided email
    const [passwordAndUserIdFromDB] = await myConnection.execute(
      `SELECT password, user_id FROM recipe_management.users where email='${email}'`
    );

    // Log the fetched data to the console for debugging
    console.log(passwordAndUserIdFromDB);

    // Check if the email is correct
    if (passwordAndUserIdFromDB.length === 0) {
      throw new Error('The email is not correct');
    }

    // Check if the provided password matches the one stored in the database
    if (validator.arePasswordsEqual(password, passwordAndUserIdFromDB[0].password)) {
      throw new Error('The password is incorrect');
    }

    // Check for additional validation messages
    if (validator.getMessage()) {
      throw new Error(validator.getMessage());
    }

    // Generate a JWT token using the user_id and sign it with the secret key
    const token = jwt.sign(passwordAndUserIdFromDB[0].user_id, secretKey, { algorithm: 'HS256' });

    // Send the JWT as a JSON response
    res.status(200).json({ token: token });

  } catch (err) {
    // Catch and handle errors, sending a 400 status with the error message
    res.status(400).send(err.message);
  }
});

// Export the router for use in other parts of the application
module.exports = router;
