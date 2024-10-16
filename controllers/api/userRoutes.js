// Import the Express router and the User model from the models directory.
const router = require('express').Router();
const { User } = require('../../models');

// POST route to handle user signup (registration).
router.post('/signup', async (req, res) => {
  try {
    console.log(req.body); // Log the request body to ensure you're receiving data correctly

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
    console.error(err); // Logs the actual error in the console
    res.status(500).json({ message: 'Server error during signup', error: err });
  }
});

// POST route to handle user login.
router.post('/login', async (req, res) => {
  try {
    // Find the user by their username
    const user = await User.findOne({ where: { username: req.body.username } });

    // Check if user exists and if the password matches
    if (!user || !user.checkPassword(req.body.password)) {
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
    console.error(err); // Logs the actual error in the console
    res.status(500).json({ message: 'Server error during login', error: err });
  }
});

// POST route to handle user logout.
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      // Send a success response once the session is destroyed.
      res.status(204).end();  // No content response on successful logout
    });
  } else {
    // If no session exists (i.e., user is not logged in), send a 404 response.
    res.status(404).end();
  }
});

// Export the router to make this route available for use in other parts of the application.
module.exports = router;
