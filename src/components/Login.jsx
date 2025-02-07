import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import thaparLogo from '../Name.png';
import hostelImage from '../Tiet-Library.png';
// import {BASE_URL} from '../config';
import config from '../config';
import './Login.css';
const BASE_URL = "http://localhost:3000";


const Login = ({ setUserRole }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showOTPVerification, setShowOTPVerification] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    role: 'student',
    department: '',
    confirmPassword: '',
    resetCode: '',
    otp: ''
  });

  
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${config.apiUrl}/auth/forgot-password`, {
        email: formData.email
      });
      setShowForgotPassword(true);
    } catch (error) {
      setError(error.response?.data?.message || 'Error sending reset code');
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${config.apiUrl}/auth/reset-password`, {
        email: formData.email,
        resetCode: formData.resetCode,
        newPassword: formData.password
      });
      setShowForgotPassword(false);
      setIsLogin(true);
    } catch (error) {
      setError(error.response?.data?.message || 'Error resetting password');
    }
  };

  const handleOTPVerification = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${config.apiUrl}/auth/verify-otp`, {
        email: formData.email,
        otp: formData.otp
      });

      if (response.data.success) {
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
        }
        setUserRole(formData.role);
        
        if (formData.role === 'teacher') {
          navigate('/teacher-dashboard');
        } else {
          navigate('/student-dashboard');
        }
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Invalid OTP');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (isLogin) {
        const response = await axios.post(`${config.apiUrl}/auth/login`, {
          email: formData.email,
          password: formData.password,
          role: formData.role
        });
        
        localStorage.setItem('token', response.data.token);
        setUserRole(formData.role);
        
        if (formData.role === 'teacher') {
          navigate('/teacher-dashboard');
        } else {
          navigate('/student-dashboard');
        }
      } else {
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          return;
        }
        
        const response = await axios.post(`${config.apiUrl}/auth/signup`, {
          email: formData.email,
          password: formData.password,
          name: formData.name,
          role: formData.role,
          department: formData.department
        });

        if (response.data.success) {
          setShowOTPVerification(true);
        }
      }
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
    }
  };

  if (showForgotPassword) {
    return (
      <div className="login-container">
        <div className="login-form-section">
          <div className="login-header">
            <img src="/tiet-logo.png" alt="TIET Logo" className="tiet-logo" />
            <h1>Reset Password</h1>
          </div>

          <form onSubmit={handleResetPassword} className="login-form">
            <div className="form-group">
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="Email Address"
                required
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                value={formData.resetCode}
                onChange={(e) => setFormData({...formData, resetCode: e.target.value})}
                placeholder="Reset Code"
                required
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                placeholder="New Password"
                required
              />
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type="submit" className="login-button">
              Reset Password
            </button>
            <button 
              type="button" 
              className="secondary-button"
              onClick={() => setShowForgotPassword(false)}
            >
              Back to Login
            </button>
          </form>
        </div>
        
        <div className="login-image-section">
          <img src={hostelImage} alt="Campus View" className="campus-image" />
        </div>
      </div>
    );
  }

  if (showOTPVerification) {
    return (
      <div className="login-container">
        <div className="login-form-section">
          <div className="login-header">
            <img src="/tiet-logo.png" alt="TIET Logo" className="tiet-logo" />
            <h1>Verify Your Email</h1>
            <p>Please enter the OTP sent to {formData.email}</p>
          </div>

          <form onSubmit={handleOTPVerification} className="login-form">
            <div className="form-group">
              <input
                type="text"
                value={formData.otp}
                onChange={(e) => setFormData({...formData, otp: e.target.value})}
                placeholder="Enter OTP"
                required
              />
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type="submit" className="login-button">
              Verify OTP
            </button>
            <p className="resend-otp">
              Didn't receive OTP? 
              <button 
                type="button" 
                className="link-button"
                onClick={async () => {
                  try {
                    await axios.post(`${config.apiUrl}/auth/resend-otp`, {
                      email: formData.email
                    });
                    alert('OTP has been resent to your email');
                  } catch (error) {
                    setError(error.response?.data?.message || 'Error resending OTP');
                  }
                }}
              >
                Resend OTP
              </button>
            </p>
          </form>
        </div>
        
        <div className="login-image-section">
          <img src={hostelImage} alt="Campus View" className="campus-image" />
        </div>
      </div>
    );
  }

  return (
    <div className="login-container">
      <div className="login-form-section">
        <div className="login-header">
          <img src="/tiet-logo.png" alt="TIET Logo" className="tiet-logo" />
          <h1>Virtual Labs Portal</h1>
          <p>Computer Science and Engineering Department</p>
        </div>
        
        <div className="login-type-toggle">
          <button 
            className={isLogin ? 'active' : ''} 
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button 
            className={!isLogin ? 'active' : ''} 
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {!isLogin && (
            <div className="form-group">
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Full Name"
                required={!isLogin}
              />
            </div>
          )}

          <div className="form-group">
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="Email Address"
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              placeholder="Password"
              required
            />
          </div>

          {!isLogin && (
            <>
              <div className="form-group">
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  placeholder="Confirm Password"
                  required={!isLogin}
                />
              </div>

              <div className="form-group">
                <select
                  value={formData.department}
                  onChange={(e) => setFormData({...formData, department: e.target.value})}
                  required={!isLogin}
                >
                  <option value="">Select Department</option>
                  <option value="CSED">Computer Science Engineering</option>
                  <option value="ECED">Electronics & Communication</option>
                  <option value="MECH">Mechanical Engineering</option>
                  <option value="CIVIL">Civil Engineering</option>
                  <option value="CHEM">Chemical Engineering</option>
                  <option value="BIOTECH">Biotechnology</option>
                  <option value="EE">Electrical Engineering</option>
                  <option value="MATH">Mathematics</option>
                </select>
              </div>
            </>
          )}

          <div className="form-group">
            <select
              value={formData.role}
              onChange={(e) => setFormData({...formData, role: e.target.value})}
              required
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>

          {error && <div className="error-message">{error}</div>}

          {isLogin && (
            <div className="forgot-password">
              <button 
                type="button" 
                onClick={handleForgotPassword}
                className="link-button"
              >
                Forgot Password?
              </button>
            </div>
          )}

          <button type="submit" className="login-button">
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
      </div>
      
      <div className="login-image-section">
        <img src={hostelImage} alt="Campus View" className="campus-image" />
      </div>
    </div>
  );
};

export default Login; 