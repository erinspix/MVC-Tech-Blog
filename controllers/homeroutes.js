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
          model: User,               // Include the User model to get the username of each post's creator.
          attributes: ['username'],   // Only include the 'username' attribute from the User model.
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

// GET route for the login page.
// This route renders the login page if the user is not already logged in.
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
// This route renders the signup page if the user is not already logged in.
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
// This route renders the user's dashboard, showing their own posts and user information.
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
      user,                          // Pass the user data to the template for rendering.
      logged_in: true,                // Indicate that the user is logged in.
    });
  } catch (err) {
    // If an error occurs, send a 500 Internal Server Error response.
    res.status(500).json(err);
  }
});

// Export the router to make these routes available for use in other parts of the application.
module.exports = router;
