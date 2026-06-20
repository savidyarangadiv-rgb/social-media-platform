import React, { useState } from 'react';
import axios from 'axios';

function Post({ post, onPostDeleted }) {
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem('user'));

  const handleLike = async () => {
    try {
      const token = localStorage.getItem('token');
      if (liked) {
        await axios.delete(
          `${process.env.REACT_APP_API_URL}/likes/${post.id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post(
          `${process.env.REACT_APP_API_URL}/likes`,
          { postId: post.id },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      setLiked(!liked);
    } catch (err) {
      console.error('Failed to toggle like');
    }
  };

  const handleDeletePost = async () => {
    if (window.confirm('Delete this post?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(
          `${process.env.REACT_APP_API_URL}/posts/${post.id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        onPostDeleted();
      } catch (err) {
        console.error('Failed to delete post');
      }
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/comments`,
        { postId: post.id, text: comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComments([...comments, response.data.comment]);
      setComment('');
    } catch (err) {
      console.error('Failed to add comment');
    }
  };

  return (
    <div className="post">
      <div className="post-header">
        <div className="post-avatar" />
        <a href={`/profile/${post.user_id}`} className="post-username">
          {post.username}
        </a>
        {currentUser.id === post.user_id && (
          <button
            onClick={handleDeletePost}
            style={{
              marginLeft: 'auto',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '18px'
            }}
          >
            ×
          </button>
        )}
      </div>

      {post.image_data && <img src={post.image_data} alt="post" className="post-image" />}

      <div className="post-actions">
        <button className="post-action-btn" onClick={handleLike}>
          {liked ? '❤️' : '🤍'}
        </button>
        <button className="post-action-btn" onClick={() => setShowComments(!showComments)}>
          💬
        </button>
      </div>

      <div className="post-stats">
        {post.like_count} likes · {post.comment_count} comments
      </div>

      {post.caption && (
        <div className="post-caption">
          <strong>{post.username}</strong>
          {post.caption}
        </div>
      )}

      {showComments && (
        <div className="comment-section">
          <form onSubmit={handleAddComment}>
            <input
              type="text"
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              style={{ width: '90%', padding: '8px', marginBottom: '10px' }}
            />
            <button type="submit" style={{ width: '8%' }}>Post</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Post;
