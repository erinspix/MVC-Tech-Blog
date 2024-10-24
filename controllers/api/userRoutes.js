// Import the Express router and User model
const router = require('express').Router();
const { User } = require('../../models');

// POST route to handle user signup (registration)
router.post('/signup', async (req, res) => {
  console.log('Signup request body:', req.body); // Log request body for debugging
  
  try {
    // Create a new user with the provided username, email, and password
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    // Save the session and mark the user as logged in
    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.logged_in = true;
      res.status(200).json(newUser); // Send the new user data in the response
    });
  } catch (err) {
    console.error('Error during signup:', err); // Log any errors
    res.status(500).json({ message: 'Server error during signup', error: err });
  }
});

module.exports = router;
