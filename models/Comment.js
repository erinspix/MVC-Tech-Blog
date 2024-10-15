// Import the Model and DataTypes objects from Sequelize.
// Model allows us to define our Comment class as a Sequelize model, while DataTypes defines the data types for each column in the model.
const { Model, DataTypes } = require('sequelize');

// Import the configured Sequelize instance from the connection file, which will be used to interact with the database.
const sequelize = require('../config/connection');

// Define a new class 'Comment' that extends the Sequelize Model class.
// This class will represent the 'comment' table in the database.
class Comment extends Model {}

// Initialize the Comment model with its schema.
// This method defines the structure of the 'comment' table and the properties of each column.
Comment.init(
  {
    // Define the 'id' column as the primary key, an auto-incrementing integer that uniquely identifies each comment.
    id: {
      type: DataTypes.INTEGER,      // The data type is an integer.
      allowNull: false,             // This field cannot be null.
      primaryKey: true,             // This field is the primary key of the table.
      autoIncrement: true,          // This field automatically increments with each new comment.
    },
    // Define the 'comment_text' column to store the content of the comment.
    comment_text: {
      type: DataTypes.STRING,       // The data type is a string (VARCHAR).
      allowNull: false,             // This field cannot be null; a comment must have content.
    },
    // Define the 'user_id' column, which references the 'id' column in the 'user' table.
    user_id: {
      type: DataTypes.INTEGER,      // The data type is an integer.
      references: {
        model: 'user',              // This field references the 'user' table.
        key: 'id',                  // It references the 'id' column of the 'user' table.
      },
    },
    // Define the 'post_id' column, which references the 'id' column in the 'post' table.
    post_id: {
      type: DataTypes.INTEGER,      // The data type is an integer.
      references: {
        model: 'post',              // This field references the 'post' table.
        key: 'id',                  // It references the 'id' column of the 'post' table.
      },
    },
    // Define the 'created_at' column to store the timestamp of when the comment was created.
    created_at: {
      type: DataTypes.DATE,         // The data type is a date (with time).
      allowNull: false,             // This field cannot be null.
      defaultValue: DataTypes.NOW,  // Automatically sets the timestamp to the current date and time when the comment is created.
    },
    // Define the 'updated_at' column to store the timestamp of when the comment was last updated.
    updated_at: {
      type: DataTypes.DATE,         // The data type is a date (with time).
      allowNull: false,             // This field cannot be null.
      defaultValue: DataTypes.NOW,  // Automatically sets the timestamp to the current date and time when the comment is updated.
    },
  },
  {
    // Pass the Sequelize instance to the model so it knows which database connection to use.
    sequelize,
    
    // Freeze the table name to prevent Sequelize from automatically pluralizing the table name.
    freezeTableName: true,

    // Use underscored field names instead of camelCased ones in the database (e.g., 'created_at' instead of 'createdAt').
    underscored: true,

    // Define the name of the model, which will be used by Sequelize.
    modelName: 'comment',
  }
);

// Export the Comment model to make it available for use in other parts of the application.
module.exports = Comment;
