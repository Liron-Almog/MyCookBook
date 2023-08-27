const mysql = require('mysql');

class Database {
  constructor() {
    this.connection = null;
    this.connect();
  }

  async connect() {
    try {
      if (this.connection === null) {
        this.connection = await mysql.createConnection({
          host: '127.0.0.1',
          port: 3306,
          user: 'root',
          password:  'A316335a207a',
          database: '' // Removed space in database name
        });

      }
      return this.connection;
    } catch (err) {
      console.error('Error connecting to the database:', err);
    }
  }
}

// Export an instance of the Database class
module.exports = new Database();
