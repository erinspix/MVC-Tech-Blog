const router = require('express').Router();
const { Comment } = require('./models');

// POST request to create a new comment
router.post('/', async (req, res) => {
  try {
    if (!req.session.logged_in) {
      res.status(401).json({ message: 'Please log in to add a comment.' });
      return;
    }

    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
