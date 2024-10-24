const router = require('express').Router();

// Import route modules
const homeRoutes = require('./homeroutes');
const userRoutes = require('./api/userRoutes');
const postRoutes = require('./api/postRoutes');
const commentRoutes = require('./api/commentRoutes');

// Set up routes
router.use('/', homeRoutes);
router.use('/api/users', userRoutes);
router.use('/api/posts', postRoutes);
router.use('/api/comments', commentRoutes);

module.exports = router;
