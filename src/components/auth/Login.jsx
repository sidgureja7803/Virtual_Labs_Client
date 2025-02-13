import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import thaparLogo from '../../assets/Hostel-M.jpg'
import hostelImage from '../../assets/Tiet-Library.png';
import config from '../../config';
import './Auth.css';

const Login = ({ setUserRole }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'student'
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post(`${config.apiUrl}/auth/login`, formData);

      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        setUserRole(formData.role);
        navigate(`/${formData.role}`);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-section">
        <div className="login-header">
          <img src={thaparLogo} alt="Thapar Logo" className="tiet-logo" />
          <h1>Thapar Virtual Labs</h1>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-type-toggle">
            <button
              type="button"
              className={formData.role === 'student' ? 'active' : ''}
              onClick={() => setFormData({ ...formData, role: 'student' })}
            >
              Student
            </button>
            <button
              type="button"
              className={formData.role === 'instructor' ? 'active' : ''}
              onClick={() => setFormData({ ...formData, role: 'instructor' })}
            >
              Lab Instructor
            </button>
            <button
              type="button"
              className={formData.role === 'coordinator' ? 'active' : ''}
              onClick={() => setFormData({ ...formData, role: 'coordinator' })}
            >
              Course Coordinator
            </button>
          </div>

          <div className="form-group">
            <input
              type="email"
              placeholder="Thapar Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-button">
            Login
          </button>

          <button
            type="button"
            className="secondary-button"
            onClick={() => navigate('/signup')}
          >
            Create New Account
          </button>
        </form>
      </div>

      <div className="login-image-section">
        <img src={hostelImage} alt="Campus View" className="campus-image" />
      </div>
    </div>
  );
};

Login.propTypes = {
  setUserRole: PropTypes.func.isRequired
};

export default Login; 