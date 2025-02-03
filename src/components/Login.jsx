import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import thaparLogo from '../assets/Name.png';
import hostelImage from '../assets/Hostel-M.jpg';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    role: 'student',
    department: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

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
        
        if (response.data.role === 'hod') {
          navigate('/hod-dashboard');
        } else {
          navigate('/student-dashboard');
        }
      } else {
        // Signup validation
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
        
        // Auto login after signup
        const loginResponse = await axios.post('/api/auth/login', {
          email: formData.email,
          password: formData.password,
          role: formData.role
        });
        
        localStorage.setItem('token', loginResponse.data.token);
        navigate(loginResponse.data.role === 'hod' ? '/hod-dashboard' : '/student-dashboard');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
      console.error('Auth failed:', error);
    }
  };

  return (
    <div className="auth-container">
      <img src={thaparLogo} alt="Thapar Logo" className="thapar-logo" />
      
      <div className="auth-content">
        <div className="image-section">
          <img src={hostelImage} alt="Thapar Campus" className="campus-image" />
        </div>

        <div className="form-section">
          <div className="form-container">
            <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
            <p className="subtitle">
              {isLogin 
                ? 'Sign in to access Thapar Virtual Labs' 
                : 'Join Thapar Virtual Labs community'}
            </p>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required={!isLogin}
                    placeholder="Enter your full name"
                  />
                </div>
              )}

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                  placeholder="Enter your email"
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required
                  placeholder="Enter your password"
                />
              </div>

              {!isLogin && (
                <>
                  <div className="form-group">
                    <label>Confirm Password</label>
                    <input
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                      required={!isLogin}
                      placeholder="Confirm your password"
                    />
                  </div>

                  <div className="form-group">
                    <label>Department</label>
                    <select
                      value={formData.department}
                      onChange={(e) => setFormData({...formData, department: e.target.value})}
                      required={!isLogin}
                    >
                      <option value="">Select Department</option>
                      <option value="CSED">Computer Science (CSED)</option>
                      <option value="ECED">Electronics (ECED)</option>
                      <option value="MECH">Mechanical</option>
                      <option value="CIVIL">Civil</option>
                      <option value="CHEM">Chemical</option>
                    </select>
                  </div>
                </>
              )}

              <div className="form-group">
                <label>Role</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  required
                >
                  <option value="student">Student</option>
                  <option value="hod">Teacher/HOD</option>
                </select>
              </div>

              <button type="submit" className="submit-button">
                {isLogin ? 'Sign In' : 'Create Account'}
              </button>
            </form>

            <div className="auth-switch">
              {isLogin ? (
                <p>Don't have an account? <button onClick={() => setIsLogin(false)}>Sign Up</button></p>
              ) : (
                <p>Already have an account? <button onClick={() => setIsLogin(true)}>Sign In</button></p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 