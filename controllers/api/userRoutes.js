// Import the Express router and the User model from the models directory.
const router = require('express').Router();
const { User } = require('../../models');

// POST route to handle user signup (registration).
// POST route to handle user signup (registration).
// POST route to handle user signup (registration).
router.post('/signup', async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.logged_in = true;
      res.status(200).json(newUser);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});




// POST route to handle user login.
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ where: { username: req.body.username } });

    if (!user || !user.checkPassword(req.body.password)) {
      res.status(400).json({ message: 'Invalid username or password' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.logged_in = true;
      res.json({ user, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


// POST route to handle user logout.
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();  // No content response on successful logout
    });
  } else {
    res.status(404).end();
  }
});


// Export the router to make this route available for use in other parts of the application.
module.exports = router;
