// Import the Express router and the User model from the models directory.
const router = require('express').Router();
const { User } = require('../../models');

// POST route to handle user signup (registration).
// This route will be accessed when a user submits the signup form.
router.post('/signup', async (req, res) => {
  try {
    // Create a new user in the database using the submitted username and password from the request body.
    const newUser = await User.create({
      username: req.body.username,  // The username from the signup form.
      password: req.body.password,  // The password from the signup form.
    });

    // Save the new user in the session and mark them as logged in.
    req.session.save(() => {
      req.session.user_id = newUser.id;   // Store the user's ID in the session.
      req.session.logged_in = true;       // Mark the user as logged in.
      res.status(200).json(newUser);      // Send a successful response with the newly created user.
    });
  } catch (err) {
    // If an error occurs during user creation, send a 500 Internal Server Error response.
    res.status(500).json(err);
  }
});

// POST route to handle user login.
// This route will be accessed when a user submits the login form.
router.post('/login', async (req, res) => {
  try {
    // Find a user in the database by the username submitted from the login form.
    const user = await User.findOne({ where: { username: req.body.username } });

    // If the user is not found or the password is incorrect, return a 400 error.
    if (!user || !user.checkPassword(req.body.password)) {
      res.status(400).json({ message: 'Invalid username or password' });
      return;
    }

    // Save the user ID in the session and mark them as logged in.
    req.session.save(() => {
      req.session.user_id = user.id;      // Store the user's ID in the session.
      req.session.logged_in = true;       // Mark the user as logged in.
      res.json({ user, message: 'You are now logged in!' });  // Send a success message with the user info.
    });
  } catch (err) {
    // If an error occurs during login, send a 500 Internal Server Error response.
    res.status(500).json(err);
  }
});

// POST route to handle user logout.
// This route will be accessed when the user clicks the logout button.
router.post('/logout', (req, res) => {
  // If the user is currently logged in, destroy the session to log them out.
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();  // Send a no content response (successful logout).
    });
  } else {
    // If the user is not logged in, return a 404 response indicating no active session to log out from.
    res.status(404).end();
  }
});

// Export the router to make this route available for use in other parts of the application.
module.exports = router;
