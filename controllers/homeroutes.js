// Import the Express router and the Post, User, and Comment models from the models directory.
const router = require('express').Router();
const { Post, User, Comment } = require('../models');

// GET route for the homepage.
// This route renders the homepage by fetching all posts and displaying them to the user.
router.get('/', async (req, res) => {
  try {
    // Fetch all posts from the database and include the username of the user who created each post.
    const postData = await Post.findAll({
      include: [
        {
          model: User, // Include the User model to get the username of each post's creator.
          attributes: ['username'],
        },
      ],
    });

    // Serialize the data by converting Sequelize objects into plain JavaScript objects.
    const posts = postData.map((post) => post.get({ plain: true }));

    // Render the 'homepage' view and pass in the posts and the logged-in status of the user.
    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    // If an error occurs, send a 500 Internal Server Error response.
    res.status(500).json(err);
  }
});

// GET route for a single post by ID.
router.get('/post/:id', async (req, res) => {
  try {
    // Find the post by its ID, including the user who posted it and any comments associated with it.
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User, // Include the user who created the post.
          attributes: ['username'],
        },
        {
          model: Comment, // Include comments on the post, and the user who made each comment.
          include: [User],
        },
      ],
    });

    // If the post doesn't exist, send a 404 error.
    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    // Serialize the data.
    const post = postData.get({ plain: true });

    // Render the 'post' view and pass the post data to it.
    res.render('post', {
      post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    // Log the error and send a 500 Internal Server Error response.
    console.error(err);
    res.status(500).json(err);
  }
});

// GET route for the login page.
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect them to the homepage.
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  // Render the 'login' view if the user is not logged in.
  res.render('login');
});

// GET route for the signup page.
router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect them to the homepage.
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  // Render the 'signup' view if the user is not logged in.
  res.render('signup');
});

// GET route for the dashboard page.
router.get('/dashboard', async (req, res) => {
  try {
    // If the user is not logged in, redirect them to the login page.
    if (!req.session.logged_in) {
      res.redirect('/login');
      return;
    }

    // Find the currently logged-in user by their session user ID and include the posts they created.
    const userData = await User.findByPk(req.session.user_id, {
      include: [{ model: Post }], // Include the posts created by the user.
    });

    // Serialize the user data by converting the Sequelize object into a plain JavaScript object.
    const user = userData.get({ plain: true });

    // Render the 'dashboard' view and pass in the user data and the logged-in status.
    res.render('dashboard', {
      user,
      logged_in: true,
    });
  } catch (err) {
    // If an error occurs, send a 500 Internal Server Error response.
    res.status(500).json(err);
  }
});

// Export the router to make these routes available for use in other parts of the application.
module.exports = router;
