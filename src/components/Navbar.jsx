import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    // Simulated user count - Replace with actual API call
    setUserCount(Math.floor(Math.random() * 10000) + 1000);
  }, []);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <img src="/name.png" alt="Virtual Labs Logo" className="logo-img" />
        </Link>
        
        <div className="nav-menu">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/about" className="nav-link">About Us</Link>
          <Link to="/contact" className="nav-link">Contact Us</Link>
          <Link to="/experiments" className="nav-link">Experiments</Link>
        </div>

        <div className="user-count">
          <span className="count-label">Active Users: </span>
          <span className="count-number">{userCount}</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;