import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/Virtual-labs.png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole');
    
    if (token) {
      setIsLoggedIn(true);
      setUserRole(role);
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    setIsLoggedIn(false);
    setUserRole(null);
    navigate('/login');
  };

  const getDashboardLink = () => {
    switch (userRole) {
      case 'coordinator':
        return '/coordinator';
      case 'instructor':
        return '/instructor';
      case 'student':
        return '/student';
      default:
        return '/';
    }
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
            <Link to="/about" className="nav-link">About</Link>
          </li>
          <li className="nav-item">
            <Link to="/departments" className="nav-link">Departments</Link>
          </li>
          <li className="nav-item">
            <Link to="/team" className="nav-link">Our Team</Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="nav-link">Contact</Link>
          </li>

          {!isLoggedIn ? (
            <li className="nav-item">
              <Link to="/login" className="nav-link sign-in-btn">Sign In</Link>
            </li>
          ) : (
            <>
              <li className="nav-item">
                <Link to={getDashboardLink()} className="nav-link">Dashboard</Link>
              </li>
              <li className="nav-item">
                <button onClick={handleLogout} className="nav-link logout-btn">Sign Out</button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;