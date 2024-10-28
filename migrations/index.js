// Import the Express router, which is used to define modular routes in the application.
const router = require('express').Router();

// Import userRoutes, postRoutes, and commentRoutes from their respective route files.
// These route files manage different parts of the application, like users, posts, and comments.
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes');

// Define the main route for user-related API requests.
// Routes starting with '/users' will be directed to the userRoutes file.
router.use('/users', userRoutes);

// Define the main route for post-related API requests.
// Routes starting with '/posts' will be directed to the postRoutes file.
router.use('/posts', postRoutes);

// Define the main route for comment-related API requests.
// Routes starting with '/comments' will be directed to the commentRoutes file.
router.use('/comments', commentRoutes);

// Export the router to make the routes available for use in other parts of the application (like in server.js).
module.exports = router;
