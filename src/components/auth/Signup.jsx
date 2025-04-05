import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './Signup.css';
import VLOGO from '../../assets/Virtual-labs.png';
import tietLogo from '../../assets/Tiet-Logo.png';
import hostelImage from '../../assets/Hostel-M.jpg';

const Signup = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (name === 'password') {
      if (!validatePassword(value)) {
        setPasswordError('Password must be at least 8 characters long and contain uppercase, lowercase, number, and special character');
      } else {
        setPasswordError('');
      }
    }

    if (name === 'confirmPassword') {
      if (value !== formData.password) {
        setError('Passwords do not match');
      } else {
        setError('');
      }
    }
  };

  const handleNextStep = () => {
    if (activeStep === 1) {
      if (!formData.email || !validatePassword(formData.password) || formData.password !== formData.confirmPassword) {
        setError('Please fill all fields correctly');
        return;
      }
    } else if (activeStep === 2) {
      if (!formData.name) {
        setError('Please enter your name');
        return;
      }
    }
    setActiveStep((prev) => Math.min(prev + 1, 3));
    setError('');
  };

  const handlePrevStep = () => {
    setActiveStep((prev) => Math.max(prev - 1, 1));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeStep !== 3) {
      handleNextStep();
    } else {
      // Final submission logic here
      console.log('Form submitted:', formData);
    }
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 1:
        return (
          <>
            <div className="form-group">
              <label>Email address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email address"
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <div className="password-field">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                />
                <span className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {passwordError && <div className="error-message">{passwordError}</div>}
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <div className="password-field">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                />
                <span className="password-toggle" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>
          </>
        );
      case 2:
        return (
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
            />
          </div>
        );
      case 3:
        return (
          <div className="verification-step">
            <p>Please check your email for verification code</p>
            <div className="form-group">
              <label>Verification Code</label>
              <input
                type="text"
                name="verificationCode"
                placeholder="Enter verification code"
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="signup-container" style={{
      backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url(${hostelImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <div className="signup-sidebar">
        <div className="sidebar-logo">
          <img src={VLOGO} alt="" />
          <div className="sidebar-logo-text">
            <p>Digital Learning Platform</p>
          </div>
        </div>

        <div className="sidebar-steps">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${((activeStep - 1) / 2) * 100}%` }}
            ></div>
          </div>
          <div className={`step-item ${activeStep >= 1 ? 'active' : ''}`}>
            <div className="step-icon">
              <i className="email-icon"></i>
            </div>
            <div className="step-text">
              <h4>Email Login</h4>
              <p>Enter your email and password</p>
            </div>
          </div>
          
          <div className="step-connector"></div>
          
          <div className={`step-item ${activeStep >= 2 ? 'active' : ''}`}>
            <div className="step-icon">
              <i className="user-icon"></i>
            </div>
            <div className="step-text">
              <h4>User Details</h4>
              <p>Enter your details</p>
            </div>
          </div>
          
          <div className="step-connector"></div>
          
          <div className={`step-item ${activeStep >= 3 ? 'active' : ''}`}>
            <div className="step-icon">
              <i className="verify-icon"></i>
            </div>
            <div className="step-text">
              <h4>Verification</h4>
              <p>Verify your email & ID</p>
            </div>
          </div>
        </div>
      </div>

      <div className="signup-main-content">
        <div className="header-logos">
          <div className="tiet-uq-logos">
            <img src={tietLogo} alt="TIET Logo" className="tiet-logo" />
          </div>
        </div>

        <div className="signup-form-wrapper">
          <div className="signup-header">
            <h1>Create a New Account</h1>
            <p>Step {activeStep} of 3</p>
          </div>

          <form className="signup-form" onSubmit={handleSubmit}>
            {renderStepContent()}

            {error && <div className="signup-error">{error}</div>}

            <div className="form-buttons">
              {activeStep > 1 && (
                <button type="button" className="back-button" onClick={handlePrevStep}>
                  Back
                </button>
              )}
              <button type="submit" className="signup-button">
                {activeStep === 3 ? 'Complete Signup' : 'Next'}
              </button>
            </div>

            <div className="login-link">
              Already have an account? <Link to="/login">Sign In</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup; 