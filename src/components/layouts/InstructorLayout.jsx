import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './InstructorLayout.css';

const InstructorLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  return (
    <div className="instructor-layout">
      <aside className={`sidebar ${isMenuOpen ? 'open' : ''}`}>
        <div className="logo">
          <img src="/logo.png" alt="Thapar University" />
          <button 
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? '×' : '☰'}
          </button>
        </div>

        <div className="user-info">
          <div className="avatar">
            <img src="/default-avatar.png" alt="User" />
          </div>
          <div className="user-details">
            <h3>Dr. Manish</h3>
            <p>PHD. IN DATA SCIENCE</p>
          </div>
        </div>

        <nav className="nav-menu">
          <Link 
            to="/instructor" 
            className={location.pathname === '/instructor' ? 'active' : ''}
          >
            <span className="icon">📊</span>
            Dashboard
          </Link>
          <Link 
            to="/instructor/lab-evaluation" 
            className={location.pathname === '/instructor/lab-evaluation' ? 'active' : ''}
          >
            <span className="icon">📝</span>
            Lab Evaluation
          </Link>
          <Link 
            to="/instructor/attendance" 
            className={location.pathname === '/instructor/attendance' ? 'active' : ''}
          >
            <span className="icon">👥</span>
            Attendance
          </Link>
        </nav>

        <div className="sidebar-footer">
          <button className="settings-btn">
            <span className="icon">⚙️</span>
            Settings
          </button>
          <button className="logout-btn" onClick={handleLogout}>
            <span className="icon">🚪</span>
            Logout
          </button>
        </div>
      </aside>

      <main className="main-content">
        <header className="top-bar">
          <div className="search-bar">
            <input 
              type="text" 
              placeholder="Search Your Course Here"
            />
          </div>
          <div className="top-actions">
            <button className="notification-btn">
              <span className="icon">🔔</span>
            </button>
            <button className="profile-btn">
              <img src="/default-avatar.png" alt="Profile" />
            </button>
          </div>
        </header>

        <div className="content-wrapper">
          {children}
        </div>
      </main>
    </div>
  );
};

export default InstructorLayout; 