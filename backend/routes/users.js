const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const pool = require('../config/database');

const router = express.Router();

// Get user profile
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, username, email, full_name, bio, profile_picture, created_at FROM users WHERE id = $1',
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = result.rows[0];

    // Get follower count
    const followers = await pool.query(
      'SELECT COUNT(*) as count FROM follows WHERE following_id = $1',
      [req.params.id]
    );

    // Get following count
    const following = await pool.query(
      'SELECT COUNT(*) as count FROM follows WHERE follower_id = $1',
      [req.params.id]
    );

    res.json({
      ...user,
      followerCount: parseInt(followers.rows[0].count),
      followingCount: parseInt(following.rows[0].count)
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update user profile
router.put('/:id', authenticateToken, async (req, res) => {
  if (req.user.id !== parseInt(req.params.id)) {
    return res.status(403).json({ error: 'Unauthorized' });
  }

  const { fullName, bio } = req.body;

  try {
    const result = await pool.query(
      'UPDATE users SET full_name = $1, bio = $2 WHERE id = $3 RETURNING id, username, email, full_name, bio',
      [fullName, bio, req.params.id]
    );

    res.json({ message: 'Profile updated', user: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
