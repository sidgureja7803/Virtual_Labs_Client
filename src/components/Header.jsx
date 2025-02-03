import React from 'react';
import { Link } from 'react-router-dom';
import thaparLogo from '../Tiet-Logo.png';

const Header = () => {
  return (
    <header className="main-header">
      <div className="header-container">
        <Link to="/" className="logo-container">
          <img src={thaparLogo} alt="Thapar Institute Logo" className="thapar-logo" />
          <div className="logo-text">
            <h1>THAPAR VIRTUAL LABS</h1>
            <p>An Initiative of Thapar Institute of Engineering & Technology</p>
          </div>
        </Link>
        <div className="top-nav">
          <Link to="/admissions">About Us</Link>
          <Link to="/international">Fetaures</Link>
          <Link to="/contact">Contact Us</Link>
        </div>
      </div>
    </header>
  );
};

export default Header; 