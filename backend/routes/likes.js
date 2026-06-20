const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const pool = require('../config/database');

const router = express.Router();

// Like a post
router.post('/', authenticateToken, async (req, res) => {
  const { postId } = req.body;

  try {
    // Check if already liked
    const alreadyLiked = await pool.query(
      'SELECT * FROM likes WHERE post_id = $1 AND user_id = $2',
      [postId, req.user.id]
    );

    if (alreadyLiked.rows.length > 0) {
      return res.status(400).json({ error: 'Already liked' });
    }

    await pool.query(
      'INSERT INTO likes (post_id, user_id) VALUES ($1, $2)',
      [postId, req.user.id]
    );

    res.status(201).json({ message: 'Post liked' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Unlike a post
router.delete('/:postId', authenticateToken, async (req, res) => {
  try {
    await pool.query(
      'DELETE FROM likes WHERE post_id = $1 AND user_id = $2',
      [req.params.postId, req.user.id]
    );

    res.json({ message: 'Post unliked' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
