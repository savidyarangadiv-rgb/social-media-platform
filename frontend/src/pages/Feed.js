import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Post from '../components/Post';

function Feed({ user }) {
  const [posts, setPosts] = useState([]);
  const [caption, setCaption] = useState('');
  const [imageData, setImageData] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/posts`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPosts(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load posts');
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageData(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!imageData) {
      setError('Please select an image');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/posts`,
        { caption, imageData },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPosts([response.data.post, ...posts]);
      setCaption('');
      setImageData('');
      setError('');
    } catch (err) {
      setError('Failed to create post');
    }
  };

  if (loading) return <div className="container">Loading...</div>;

  return (
    <div className="container" style={{ paddingTop: '20px' }}>
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '4px', marginBottom: '20px' }}>
        <h2>Create a Post</h2>
        <form onSubmit={handleCreatePost}>
          <div className="form-group">
            <textarea
              placeholder="What's on your mind?"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          {error && <div className="error">{error}</div>}
          <button type="submit">Post</button>
        </form>
      </div>

      <div className="feed">
        {posts.map((post) => (
          <Post key={post.id} post={post} onPostDeleted={() => fetchPosts()} />
        ))}
      </div>
    </div>
  );
}

export default Feed;
