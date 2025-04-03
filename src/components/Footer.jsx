import React, { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = forwardRef((props, ref) => {
  return (
    <footer className="footer" ref={ref}>
      <div className="footer-content">
        <div className="footer-section">
          <h3>About Us</h3>
          <p>
            Thapar Virtual Labs is a pioneering initiative by Thapar Institute of Engineering & Technology 
            to provide remote access to labs in various engineering disciplines. Our platform enables students 
            to perform experiments and learn from anywhere in the world.
          </p>
        </div>
        
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/departments">Departments</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/feedback">Feedback</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Contact Info</h3>
          <ul className="contact-info">
            <li>
              <i className="fas fa-map-marker-alt"></i>
              Thapar Institute of Engineering & Technology, Patiala, Punjab, India - 147004
            </li>
            <li>
              <i className="fas fa-phone"></i>
              +91-175-2393021
            </li>
            <li>
              <i className="fas fa-envelope"></i>
              virtuallabs@thapar.edu
            </li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Thapar Virtual Labs. All rights reserved.</p>
      </div>
    </footer>
  );
});

export default Footer; 