const router = require('express').Router();
const { Blog } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  console.log("Incoming Data: ", req.body)
  try {
    const newBlog = await Blog.create({
      ...req.body,
      username: req.session.username,
    });
    console.log("New Data: ", newBlog)
    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
        username: req.session.username,
      },
    });

    if (!blogData) {
      res.status(404).json({ message: 'No blog found with this username!' });
      return;
    }

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
