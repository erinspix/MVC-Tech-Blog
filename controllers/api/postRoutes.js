// Import the Express router and the Post model from the models directory.
const router = require('express').Router();
const { Post } = require('../../models');

// POST route to create a new blog post.
// This route will be accessed when a user creates a new post from the dashboard.
router.post('/', async (req, res) => {
  try {
    // Create a new post in the database.
    // The content of the post (like title, content) is passed in the request body (req.body).
    // The user_id is obtained from the session data of the logged-in user.
    const newPost = await Post.create({
      ...req.body,           // Spread the request body (req.body) which contains the post data.
      user_id: req.session.user_id,  // Associate the post with the logged-in user using session data.
    });

    // Send the newly created post data as a JSON response.
    res.status(200).json(newPost);
  } catch (err) {
    // If an error occurs, send a 500 Internal Server Error response.
    res.status(500).json(err);
  }
});

// PUT route to update an existing blog post by its ID.
// This route will be accessed when a user wants to update a specific post.
router.put('/:id', async (req, res) => {
  try {
    // Update the post in the database using the post ID provided in the request parameters (req.params.id).
    const updatedPost = await Post.update(req.body, {
      where: { id: req.params.id },  // Find the post by its ID.
    });

    // If no post with the given ID is found, send a 404 Not Found response.
    if (!updatedPost) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    // Send the updated post data as a JSON response.
    res.status(200).json(updatedPost);
  } catch (err) {
    // If an error occurs, send a 500 Internal Server Error response.
    res.status(500).json(err);
  }
});

// DELETE route to delete a blog post by its ID.
// This route will be accessed when a user wants to delete a specific post.
router.delete('/:id', async (req, res) => {
  try {
    // Delete the post from the database using the post ID provided in the request parameters.
    const postData = await Post.destroy({
      where: { id: req.params.id },  // Find the post by its ID and delete it.
    });

    // If no post with the given ID is found, send a 404 Not Found response.
    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    // Send the deleted post data as a JSON response.
    res.status(200).json(postData);
  } catch (err) {
    // If an error occurs, send a 500 Internal Server Error response.
    res.status(500).json(err);
  }
});

// Export the router to make this route available for use in other parts of the application.
module.exports = router;
