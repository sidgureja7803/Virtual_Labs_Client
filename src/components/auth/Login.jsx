import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './Login.css';
import tietLogo from '../../assets/Tiet-Logo.png';
import uqLogo from '../../assets/Name.png';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [selectedRole, setSelectedRole] = useState('student');
  const [passwordError, setPasswordError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(''); // Clear error when user types

    if (name === "password") {
      setFormData({ ...formData, password: value });
      
      // Password validation regex
      const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      
      if (!passwordRegex.test(value)) {
        setPasswordError("Password must be at least 8 characters long, include 1 special character, 1 uppercase letter, 1 lowercase letter, and 1 number.");
      } else {
        setPasswordError("");
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setError(''); // Clear error when role changes
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      // Here you would make your API call to verify credentials
      // For now, we'll simulate a response
      const response = await mockLoginAPI(formData.email, formData.password, selectedRole);
      
      if (response.success) {
        // Handle successful login
        console.log('Login successful');
        // You can redirect or update state here
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  // Mock API call - replace with actual API call
  const mockLoginAPI = async (email, password, role) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate API validation
        const isValid = email.includes('@') && password.length >= 8;
        resolve({ success: isValid });
      }, 1000);
    });
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="welcome-text">
          <h2>Welcome to</h2>
          <h1>Thapar Virtual Labs</h1>
          <h3>Innovate, Experiment, Excel</h3>
          <p>Access from anywhere, anytime !! </p>
        </div>
      </div>

      <div className="login-right">
        <div className="header-logos">
          <div className="logo-container">
            <img src={tietLogo} alt="TIET Logo" className="tiet-logo" />
            <img src={uqLogo} alt="UQ Logo" className="uq-logo" />
          </div>
        </div>

        <div className="login-form-container">
          <div className="login-header">
            <h1>Sign in</h1>
            <p>Welcome Back!</p>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="role-selection">
              <button
                type="button"
                className={`role-button ${selectedRole === 'coordinator' ? 'active' : ''}`}
                onClick={() => handleRoleSelect('coordinator')}
              >
                Course Coordinator
              </button>
              <button
                type="button"
                className={`role-button ${selectedRole === 'instructor' ? 'active' : ''}`}
                onClick={() => handleRoleSelect('instructor')}
              >
                Instructor
              </button>
              <button
                type="button"
                className={`role-button ${selectedRole === 'student' ? 'active' : ''}`}
                onClick={() => handleRoleSelect('student')}
              >
                Student
              </button>
            </div>

            <div className="form-group">
              <label>Email address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
              <p className="helper-text">Only Thapar University email is allowed</p>
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="password-field">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                />
                <span className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>

            {error && <div className="error-message">{error}</div>}

            <a href="#" className="forgot-password">Forgot password?</a>

            <button type="submit" className="login-button">
              Login
            </button>

            <div className="signup-link">
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login; 