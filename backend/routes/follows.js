const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const pool = require('../config/database');

const router = express.Router();

// Follow user
router.post('/', authenticateToken, async (req, res) => {
  const { followingId } = req.body;

  if (req.user.id === followingId) {
    return res.status(400).json({ error: 'Cannot follow yourself' });
  }

  try {
    const alreadyFollowing = await pool.query(
      'SELECT * FROM follows WHERE follower_id = $1 AND following_id = $2',
      [req.user.id, followingId]
    );

    if (alreadyFollowing.rows.length > 0) {
      return res.status(400).json({ error: 'Already following' });
    }

    await pool.query(
      'INSERT INTO follows (follower_id, following_id) VALUES ($1, $2)',
      [req.user.id, followingId]
    );

    res.status(201).json({ message: 'User followed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Unfollow user
router.delete('/:followingId', authenticateToken, async (req, res) => {
  try {
    await pool.query(
      'DELETE FROM follows WHERE follower_id = $1 AND following_id = $2',
      [req.user.id, req.params.followingId]
    );

    res.json({ message: 'User unfollowed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
