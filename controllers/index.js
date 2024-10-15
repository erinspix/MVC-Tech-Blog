// Import the Express router to define route handling.
const router = require('express').Router();

// Import the homeRoutes and apiRoutes modules.
// homeRoutes handles routes related to rendering views (like homepage, login, dashboard).
// apiRoutes handles all API-related routes (like user authentication, posts, comments).
const homeRoutes = require('./homeRoutes');
const apiRoutes = require('./api');

// Use the homeRoutes for any requests that match the root URL ("/").
// This means any non-API routes, like the homepage or dashboard, will be handled by homeRoutes.
router.use('/', homeRoutes);

// Use the apiRoutes for any requests that start with "/api".
// This directs all API-related requests (e.g., /api/users, /api/posts) to the apiRoutes module.
router.use('/api', apiRoutes);

// Export the router to make it available for use in other parts of the application.
// This file acts as the central router configuration that brings together both home and API routes.
module.exports = router;
