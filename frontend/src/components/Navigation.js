import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navigation({ onLogout, user }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="container">
        <nav>
          <Link to="/" style={{ fontSize: '24px', fontWeight: 'bold' }}>📸 Social</Link>
          <div>
            <Link to="/">Home</Link>
            <Link to={`/profile/${user?.id}`}>Profile</Link>
            <button onClick={handleLogout} style={{ marginLeft: '10px' }}>Logout</button>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navigation;
