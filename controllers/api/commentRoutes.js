// Import the Express router and the Comment model from the models directory.
const router = require('express').Router();
const { Comment } = require('../../models');

// POST route to create a new comment.
// This route will be accessed when a user submits a new comment on a post.
router.post('/', async (req, res) => {
  try {
    // Check if the user is logged in before allowing them to post a comment.
    if (!req.session.logged_in) {
      // If the user is not logged in, send a 401 Unauthorized response with an error message.
      res.status(401).json({ message: 'Please log in to add a comment.' });
      return;
    }

    // Create a new comment in the database.
    // Spread operator is used to include the contents of the request body (req.body), which should contain the comment text.
    // The user_id is added based on the current logged-in user's session.
    const newComment = await Comment.create({
      ...req.body,            // The request body, which should contain fields such as comment_text.
      user_id: req.session.user_id,  // Associate the comment with the currently logged-in user via session data.
    });

    // Respond with the newly created comment data in JSON format.
    res.status(200).json(newComment);
  } catch (err) {
    // If an error occurs, send a 500 Internal Server Error response with the error message.
    res.status(500).json(err);
  }
});

// Export the router to make this route available in other parts of the application.
module.exports = router;
