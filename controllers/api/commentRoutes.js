const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all comments and JOIN with user data
    const commentData = await Comment.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    // Serialize data so the template can read it
    const comments = commentData.map((comment) => comment.get({ plain: true }));
    console.log("comment data: ", comments)
    // Pass serialized data and session flag into template
    res.render('comments', { 
      comments, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const commentData = await Comment.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Blog,
          attributes: ['title'],
        },
      ],
    });

    const comment = commentData.get({ plain: true });
    res.render('comment', {
      ...comment,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.log("Error: ", err)
    res.status(500).json(err);
  }
});

router.post('/', withAuth, async (req, res) => {
  console.log("Incoming Data: ", req.body)
  try {
    const newComment = await Comment.create({
      ...req.body,
      username: req.session.username,
    });
    console.log("New Data: ", newComment)
    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        username: req.session.username,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this username!' });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
