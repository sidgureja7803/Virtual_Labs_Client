import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import tietLogo from '../../assets/tiet-logo.png';

const Header = ({ userRole }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const getNavLinks = () => {
    switch (userRole) {
      case 'coordinator':
        return (
          <>
            <Link to="/coordinator">Dashboard</Link>
            <Link to="/coordinator/courses">Manage Courses</Link>
            <Link to="/coordinator/manage-instructors">Manage Instructors</Link>
          </>
        );
      case 'instructor':
        return (
          <>
            <Link to="/instructor">Dashboard</Link>
            <Link to="/instructor/classrooms">My Classrooms</Link>
          </>
        );
      case 'student':
        return (
          <>
            <Link to="/student">Dashboard</Link>
            <Link to="/student/courses">Browse Courses</Link>
            <Link to="/student/classroom">My Classrooms</Link>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <header className="header">
      <div className="header-left">
        <img src={tietLogo} alt="TIET Logo" className="tiet-logo" />
        <h1>Thapar Virtual Labs</h1>
      </div>
      
      <nav className="header-nav">
        {getNavLinks()}
      </nav>
      
      <div className="header-right">
        {userRole ? (
          <>
            <span className="user-role">{userRole}</span>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="login-btn">Login</Link>
        )}
      </div>
    </header>
  );
};

export default Header; 