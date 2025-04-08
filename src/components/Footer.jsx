import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import { FaInstagram, FaTwitter, FaLinkedin, FaFacebook } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about-section">
          <h3>COE | TIET-UQ</h3>
          <p>
            At Thapar University, we are committed to pioneering solutions in sustainable energy, AI,
            smart cities. This proposal outlines our vision for addressing global challenges through innovative
            research and collaboration. Join us as we work towards creating impactful, real-world solutions
            for a sustainable future.
          </p>
          <div className="social-links">
            <a href="https://instagram.com/thaparedu" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="https://twitter.com/thaparedu" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>
            <a href="https://linkedin.com/school/thapar-university" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a>
            <a href="https://facebook.com/thaparedu" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </a>
          </div>
        </div>
        
        <div className="footer-section resource-section">
          <h3>Resource</h3>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/team">Our Team</Link></li>
            <li><Link to="/sitemap">SiteMap</Link></li>
          </ul>
        </div>
        
        <div className="footer-section legal-section">
          <h3>COE | TIET-UQ</h3>
          <ul>
            <li><Link to="/terms">Terms and Conditions</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Thapar Virtual Labs. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer; 