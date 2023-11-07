const mysql = require('mysql2/promise');

class Database {

  constructor() {
    // Initialize the connection as null
    this.connection = null;
  }

  async connect() {
    try {
      if (this.connection === null) {
        // Create the connection if it doesn't exist
        this.connection = await mysql.createConnection({
          host: 'localhost',
          user: 'root',
          port: '3306',
          password: 'A316335207a',
          database: 'recipe_management' // Removed space in database name
        });
        
      }
      
      return this.connection;
    } catch (err) {
      console.error('Error connecting to the database:', err);
      throw err; // Rethrow the error to handle it elsewhere, if needed
    }
  }
}

// Export an instance of the Database class
module.exports = new Database();
