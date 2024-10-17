// Import the Sequelize library, which will be used to interact with the PostgreSQL database.
const Sequelize = require('sequelize');

// Load environment variables from the .env file, which will include the database name, username, and password.
require('dotenv').config();

if (process.env.DB_URL) {
  sequelize = new Sequelize(process.env.DB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'postgres'
    }
  );
}





// Initialize a new Sequelize instance to connect to the PostgreSQL database.
// The database connection details are retrieved from environment variables using process.env.
// const sequelize = new Sequelize(
//   process.env.DB_NAME,    // The name of the database to connect to (retrieved from .env file).
//   process.env.DB_USER,    // The database username (retrieved from .env file).
//   process.env.DB_PASSWORD, // The database password (retrieved from .env file).
//   {
//     host: 'localhost',    // The host where the PostgreSQL database is running (in this case, locally).
//     dialect: 'postgres',  // Specify that the dialect (SQL flavor) is PostgreSQL.
//     // port: 5432,           // The port on which PostgreSQL is running (default is 5432).
//   }
// );

// Export the sequelize instance to be used in other parts of the application.
// This allows Sequelize to be used across models and other files that need database access.
module.exports = sequelize;
