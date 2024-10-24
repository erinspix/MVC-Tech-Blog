// Import the Express router and the Comment model from the models directory
const router = require('express').Router();
const { Comment } = require('../../models');

// POST route to create a new comment
router.post('/', async (req, res) => {
  try {
    // Check if the user is logged in before allowing them to post a comment
    if (!req.session.logged_in) {
      return res.status(401).json({ message: 'Please log in to add a comment.' });
    }

    // Create a new comment in the database
    const newComment = await Comment.create({
      ...req.body,               // Include the contents of the request body (e.g., comment text)
      user_id: req.session.user_id,  // Associate the comment with the logged-in user
    });

    // Respond with the newly created comment data in JSON format
    res.status(200).json(newComment);
  } catch (err) {
    // Handle errors and respond with a 500 status code
    res.status(500).json(err);
  }
});

// Export the router to make this route available in other parts of the application
module.exports = router;
