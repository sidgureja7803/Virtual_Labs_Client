import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './Signup.css';
import VLOGO from '../../assets/Virtual-labs.png';
import tietLogo from '../../assets/Tiet-Logo.png';
import hostelImage from '../../assets/Hostel-M.jpg';

const Signup = () => {
  const navigate = useNavigate();
  // Check if user has partial registration
  useEffect(() => {
    const registrationStep = localStorage.getItem('registrationStep');
    const userEmail = localStorage.getItem('userEmail');
    
    if (registrationStep && userEmail) {
      setActiveStep(parseInt(registrationStep));
      setFormData(prevData => ({
        ...prevData,
        email: userEmail,
        // Load other saved data if available
        name: localStorage.getItem('userName') || '',
        password: localStorage.getItem('userPassword') || '',
        employeeId: localStorage.getItem('userEmployeeId') || '',
        department: localStorage.getItem('userDepartment') || '',
        branch: localStorage.getItem('userBranch') || '',
        phone: localStorage.getItem('userPhone') || '',
        address: localStorage.getItem('userAddress') || ''
      }));
    }
  }, []);

  const [activeStep, setActiveStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    employeeId: '',
    department: '',
    branch: '',
    phone: '',
    address: '',
    verificationCode: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  const validateEmployeeId = (id) => {
    // Assuming employee ID is alphanumeric and at least 5 characters
    return id.length >= 5;
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

    if (name === 'phone' && value.length > 0) {
      if (!validatePhone(value)) {
        setError('Phone number must be 10 digits');
      } else {
        setError('');
      }
    }

    if (name === 'employeeId' && value.length > 0) {
      if (!validateEmployeeId(value)) {
        setError('Employee ID must be at least 5 characters');
      } else {
        setError('');
      }
    }
  };

  const saveProgress = () => {
    localStorage.setItem('registrationStep', activeStep.toString());
    localStorage.setItem('userEmail', formData.email);
    localStorage.setItem('userName', formData.name);
    localStorage.setItem('userPassword', formData.password);
    
    if (activeStep >= 2) {
      localStorage.setItem('userEmployeeId', formData.employeeId);
      localStorage.setItem('userDepartment', formData.department);
      localStorage.setItem('userBranch', formData.branch);
      localStorage.setItem('userPhone', formData.phone);
      localStorage.setItem('userAddress', formData.address);
    }
  };

  const handleNextStep = () => {
    if (activeStep === 1) {
      if (!formData.email || !formData.name || !validatePassword(formData.password) || formData.password !== formData.confirmPassword) {
        setError('Please fill all fields correctly');
        return;
      }
    } else if (activeStep === 2) {
      if (!formData.employeeId || !formData.department || !formData.branch || !formData.phone || !formData.address) {
        setError('Please fill all fields correctly');
        return;
      }
      
      if (!validatePhone(formData.phone)) {
        setError('Phone number must be 10 digits');
        return;
      }
      
      if (!validateEmployeeId(formData.employeeId)) {
        setError('Employee ID must be at least 5 characters');
        return;
      }
      
      // Simulating sending a verification code to the user's email
      console.log('Sending verification code to:', formData.email);
    }
    
    const newStep = Math.min(activeStep + 1, 3);
    setActiveStep(newStep);
    saveProgress();
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
      // Verify the code and complete registration
      if (!formData.verificationCode) {
        setError('Please enter the verification code');
        return;
      }
      
      // Here we would normally validate the verification code with the backend
      // For demo purposes, we'll assume it's correct if it's 6 digits
      if (formData.verificationCode.length !== 6) {
        setError('Invalid verification code');
        return;
      }
      
      // Registration successful
      console.log('Registration complete:', formData);
      
      // Clear local storage
      localStorage.removeItem('registrationStep');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userName');
      localStorage.removeItem('userPassword');
      localStorage.removeItem('userEmployeeId');
      localStorage.removeItem('userDepartment');
      localStorage.removeItem('userBranch');
      localStorage.removeItem('userPhone');
      localStorage.removeItem('userAddress');
      
      // Redirect to login
      navigate('/login', { state: { message: 'Registration successful! Please login with your credentials.' } });
    }
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 1:
        return (
          <>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
            </div>
            <div className="form-group">
              <label>Email address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email address"
                required
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
                  placeholder="Password"
                  required
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
                  required
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
          <>
            <div className="form-group">
              <label>Employee/Student ID</label>
              <input
                type="text"
                name="employeeId"
                value={formData.employeeId}
                onChange={handleChange}
                placeholder="Enter your ID"
                required
              />
            </div>
            <div className="form-group">
              <label>Department</label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
              >
                <option value="">Select Department</option>
                <option value="CSED">Computer Science</option>
                <option value="ECED">Electronics & Communication</option>
                <option value="CIVIL">Civil Engineering</option>
                <option value="MECH">Mechanical Engineering</option>
                <option value="EED">Electrical Engineering</option>
                <option value="CHEM">Chemical Engineering</option>
              </select>
            </div>
            <div className="form-group">
              <label>Branch/Specialization</label>
              <input
                type="text"
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                placeholder="Enter your branch or specialization"
                required
              />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your 10-digit phone number"
                required
              />
            </div>
            <div className="form-group">
              <label>Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your address"
                rows="3"
                required
              ></textarea>
            </div>
          </>
        );
      case 3:
        return (
          <div className="verification-step">
            <p>We've sent a verification code to <strong>{formData.email}</strong></p>
            <p>Please check your email and enter the code below to complete your registration.</p>
            <div className="form-group">
              <label>Verification Code</label>
              <input
                type="text"
                name="verificationCode"
                value={formData.verificationCode}
                onChange={handleChange}
                placeholder="Enter 6-digit verification code"
                maxLength="6"
                required
              />
            </div>
            <div className="resend-code">
              <button type="button" className="resend-button">
                Resend Code
              </button>
              <span>Code will expire in 10 minutes</span>
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
              <h4>Account Setup</h4>
              <p>Basic information</p>
            </div>
          </div>
          
          <div className="step-connector"></div>
          
          <div className={`step-item ${activeStep >= 2 ? 'active' : ''}`}>
            <div className="step-icon">
              <i className="user-icon"></i>
            </div>
            <div className="step-text">
              <h4>Personal Details</h4>
              <p>Professional information</p>
            </div>
          </div>
          
          <div className="step-connector"></div>
          
          <div className={`step-item ${activeStep >= 3 ? 'active' : ''}`}>
            <div className="step-icon">
              <i className="verify-icon"></i>
            </div>
            <div className="step-text">
              <h4>Verification</h4>
              <p>Verify your email</p>
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