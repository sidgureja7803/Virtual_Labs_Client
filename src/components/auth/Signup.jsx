import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../../config';
import './Auth.css';

const Signup = ({ setUserRole }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    department: '',
    employeeId: '', // for coordinators and instructors
    verificationCode: '', // for coordinators
  });
  
  const [showVerification, setShowVerification] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const departments = [
    { code: 'CSED', name: 'Computer Science Engineering' },
    { code: 'ECED', name: 'Electronics & Communication' },
    { code: 'MECH', name: 'Mechanical Engineering' },
    { code: 'CIVIL', name: 'Civil Engineering' },
    { code: 'CHEM', name: 'Chemical Engineering' },
    { code: 'BIOTECH', name: 'Biotechnology' },
    { code: 'EE', name: 'Electrical Engineering' },
    { code: 'MATH', name: 'Mathematics' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post(`${config.apiUrl}/auth/signup`, formData);
      
      if (formData.role === 'coordinator' && !showVerification) {
        setShowVerification(true);
        return;
      }

      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        setUserRole(formData.role);
        navigate(`/${formData.role}`);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred during signup');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form-section">
        <h2>Sign Up for Thapar Virtual Labs</h2>
        
        <form onSubmit={handleSubmit} className="auth-form">
          {!showVerification ? (
            <>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label>Role</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  required
                >
                  <option value="">Select Role</option>
                  <option value="coordinator">Course Coordinator</option>
                  <option value="instructor">Lab Instructor</option>
                  <option value="student">Student</option>
                </select>
              </div>

              {(formData.role === 'coordinator' || formData.role === 'instructor') && (
                <div className="form-group">
                  <label>Employee ID</label>
                  <input
                    type="text"
                    value={formData.employeeId}
                    onChange={(e) => setFormData({...formData, employeeId: e.target.value})}
                    required
                  />
                </div>
              )}

              <div className="form-group">
                <label>Department</label>
                <select
                  value={formData.department}
                  onChange={(e) => setFormData({...formData, department: e.target.value})}
                  required
                >
                  <option value="">Select Department</option>
                  {departments.map(dept => (
                    <option key={dept.code} value={dept.code}>
                      {dept.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  required
                />
              </div>
            </>
          ) : (
            <div className="form-group">
              <label>Verification Code</label>
              <input
                type="text"
                value={formData.verificationCode}
                onChange={(e) => setFormData({...formData, verificationCode: e.target.value})}
                placeholder="Enter the verification code sent by admin"
                required
              />
            </div>
          )}

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="submit-button">
            {showVerification ? 'Verify & Complete Signup' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup; 