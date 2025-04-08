import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './Login.css';
import tietLogo from '../../assets/Tiet-Logo.png';
import uqLogo from '../../assets/Name.png';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [selectedRole, setSelectedRole] = useState('student');
  const [passwordError, setPasswordError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // Display success message if coming from successful registration
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
    }
  }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(''); // Clear error when user types

    if (name === "password") {
      // Password validation regex
      const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      
      if (!passwordRegex.test(value)) {
        setPasswordError("Password must be at least 8 characters long, include 1 special character, 1 uppercase letter, 1 lowercase letter, and 1 number.");
      } else {
        setPasswordError("");
      }
    }
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setError(''); // Clear error when role changes
  };

  const checkRegistrationStatus = async (email) => {
    // In a real app, this would be an API call to check registration status
    // For demo, we'll simulate by checking localStorage
    
    // Check if there's partial registration data for this email
    const storedEmail = localStorage.getItem('userEmail');
    
    if (storedEmail === email) {
      const step = localStorage.getItem('registrationStep');
      if (step) {
        return {
          isRegistered: false,
          completedStep: parseInt(step),
          email: email
        };
      }
    }
    
    // Mock check if user is fully registered
    // For demo purposes, we'll consider these emails as fully registered
    const registeredEmails = ['test@thapar.edu', 'admin@thapar.edu', 'instructor@thapar.edu'];
    return {
      isRegistered: registeredEmails.includes(email),
      completedStep: 3,
      email: email
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      // First check registration status
      const registrationStatus = await checkRegistrationStatus(formData.email);
      
      if (!registrationStatus.isRegistered) {
        // User has started but not completed registration
        if (registrationStatus.completedStep < 3) {
          setError(`You need to complete your registration process.`);
          setTimeout(() => {
            navigate('/signup');
          }, 2000);
          return;
        }
      }
      
      // If fully registered, proceed with login
      const response = await mockLoginAPI(formData.email, formData.password, selectedRole);
      
      if (response.success) {
        // Set tokens and user role in localStorage
        localStorage.setItem('token', 'mock-jwt-token');
        localStorage.setItem('userRole', selectedRole);
        
        // Redirect based on role
        switch (selectedRole) {
          case 'coordinator':
            navigate('/coordinator');
            break;
          case 'instructor':
            navigate('/instructor');
            break;
          case 'student':
            navigate('/student');
            break;
          default:
            navigate('/');
        }
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

          {successMessage && (
            <div className="success-message">
              {successMessage}
            </div>
          )}

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

            <Link to="/forgot-password" className="forgot-password">Forgot password?</Link>

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