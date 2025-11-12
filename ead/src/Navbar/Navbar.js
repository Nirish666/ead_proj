import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        {/* This puts Home on the left */}
        <Link to="/" className="nav-logo">
          🏠 RealEstate
        </Link>
      </div>
      
      <div className="navbar-right">
        {user ? (
          <>
            <Link to="/real-estate" className="nav-link">
              Properties
            </Link>
            <span className="user-display">
              {user.fullName}
            </span>
            <button onClick={handleLogout} className="nav-link nav-link-button">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">
              Login
            </Link>
            <Link to="/register" className="nav-link nav-link-button">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;