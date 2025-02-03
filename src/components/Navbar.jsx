import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          Thapar Virtual Labs
        </Link>
        <div className="nav-menu">
          <Link to="/" className="nav-link">HOME</Link>
          <Link to="/about" className="nav-link">ABOUT US</Link>
          <Link to="/labs" className="nav-link">LABS</Link>
          <Link to="/institutes" className="nav-link">PARTICIPATING INSTITUTES</Link>
          <Link to="/contact" className="nav-link">CONTACT US</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 