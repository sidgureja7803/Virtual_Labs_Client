import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import thaparLogo from '../Name.png';
import hostelImage from '../Tiet-Library.png';
import './Login.css';

const Login = ({ setUserRole }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    role: 'student',
    department: '',
    confirmPassword: '',
    resetCode: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/forgot-password', {
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
      await axios.post('/api/auth/reset-password', {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (isLogin) {
        const response = await axios.post('/api/auth/login', {
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
        
        await axios.post('/api/auth/signup', {
          email: formData.email,
          password: formData.password,
          name: formData.name,
          role: formData.role,
          department: formData.department
        });
        
        setIsLogin(true);
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