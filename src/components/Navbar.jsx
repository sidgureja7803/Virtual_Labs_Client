import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/Virtual-labs.png';

const Navbar = ({ onAboutClick, onDepartmentsClick, onContactClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src={logo} alt="Virtual Labs Logo" />
          <span>Virtual Labs</span>
        </Link>

        <div className="menu-icon" onClick={toggleMenu}>
          <i className={`fas fa-${isMenuOpen ? 'times' : 'bars'}`} />
        </div>

        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <button onClick={onAboutClick} className="nav-link">About</button>
          </li>
          <li className="nav-item">
            <button onClick={onDepartmentsClick} className="nav-link">Departments</button>
          </li>
          <li className="nav-item">
            <button onClick={onContactClick} className="nav-link">Contact</button>
          </li>
          <li className="nav-item">
            <Link to="/login" className="nav-link login-btn">Login</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;