// Import the Express router and the User model from the models directory.
const router = require('express').Router();
const { User } = require('../../models');

// POST route to handle user signup (registration).
router.post('/signup', async (req, res) => {
  try {
    console.log('Signup request:', req.body); // Log the request body for debugging

    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    // Save the user in the session and mark them as logged in
    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.logged_in = true;
      res.status(200).json(newUser);
    });
  } catch (err) {
    console.error('Error during signup:', err); // Detailed error log
    res.status(500).json({ message: 'Server error during signup', error: err });
  }
});

// POST route to handle user login.
router.post('/login', async (req, res) => {
  try {
    console.log('Login request:', req.body); // Log the request body for debugging

    // Find the user by their username
    const user = await User.findOne({ where: { username: req.body.username } });

    // Check if user exists
    if (!user) {
      res.status(400).json({ message: 'Invalid username or password' });
      return;
    }

    // Check if the password is valid
    const validPassword = user.checkPassword(req.body.password);
    console.log('Password valid:', validPassword); // Log password validation result

    if (!validPassword) {
      res.status(400).json({ message: 'Invalid username or password' });
      return;
    }

    // Save the user in the session and mark them as logged in
    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.logged_in = true;
      res.json({ user, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.error('Error during login:', err); // Detailed error log
    res.status(500).json({ message: 'Server error during login', error: err });
  }
});

// POST route to handle user logout.
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      // Send a success response once the session is destroyed.
      res.status(204).end(); // No content response on successful logout
    });
  } else {
    // If no session exists (i.e., user is not logged in), send a 404 response.
    res.status(404).end();
  }
});

// Export the router to make this route available for use in other parts of the application.
module.exports = router;
