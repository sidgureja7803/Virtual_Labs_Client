import React from 'react';

const Hero = () => {
  return (
    <div className="hero-section">
      <div className="hero-overlay">
        <div className="hero-content">
          <h1>Welcome to Thapar Virtual Labs</h1>
          <p>Experience world-class virtual laboratory learning</p>
          <div className="hero-stats">
            <div className="stat-item">
              <h3>8M+</h3>
              <p>Students Served</p>
            </div>
            <div className="stat-item">
              <h3>500+</h3>
              <p>Virtual Experiments</p>
            </div>
            <div className="stat-item">
              <h3>24/7</h3>
              <p>Lab Access</p>
            </div>
          </div>
          <button className="cta-button">Explore Labs</button>
        </div>
      </div>
    </div>
  );
};

export default Hero; 