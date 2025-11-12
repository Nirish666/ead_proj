import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        {/* This puts Home on the left */}
        <Link to="/" className="nav-logo">
          RealEstate
        </Link>
      </div>
      
      {/* --- ADDED THIS SECTION --- */}
      <div className="navbar-right">
        <Link to="/login" className="nav-link">
          Login
        </Link>
        <Link to="/register" className="nav-link nav-link-button">
          Register
        </Link>
      </div>
      {/* --- END OF ADDED SECTION --- */}

    </nav>
  );
}

export default Navbar;