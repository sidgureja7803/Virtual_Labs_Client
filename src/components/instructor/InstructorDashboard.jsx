import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from '../../config';
import './InstructorDashboard.css';

const InstructorDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [stats, setStats] = useState({
    totalClassrooms: 0,
    activeStudents: 0,
    pendingEvaluations: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [coursesRes, statsRes] = await Promise.all([
        axios.get(`${config.apiUrl}/instructor/courses`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }),
        axios.get(`${config.apiUrl}/instructor/stats`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
      ]);

      setCourses(coursesRes.data);
      setStats(statsRes.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load dashboard data');
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading dashboard...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="instructor-dashboard">
      <div className="dashboard-header">
        <h1>Lab Instructor Dashboard</h1>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Classrooms</h3>
          <p>{stats.totalClassrooms}</p>
        </div>
        <div className="stat-card">
          <h3>Active Students</h3>
          <p>{stats.activeStudents}</p>
        </div>
        <div className="stat-card">
          <h3>Pending Evaluations</h3>
          <p>{stats.pendingEvaluations}</p>
        </div>
      </div>

      <div className="courses-section">
        <h2>Your Courses</h2>
        <div className="courses-grid">
          {courses.map(course => (
            <div key={course._id} className="course-card">
              <h3>{course.name}</h3>
              <p className="course-code">{course.courseCode}</p>
              <div className="course-stats">
                <div>
                  <span>Students</span>
                  <p>{course.studentsCount}</p>
                </div>
                <div>
                  <span>Experiments</span>
                  <p>{course.experimentsCount}</p>
                </div>
              </div>
              <div className="course-actions">
                <Link 
                  to={`/instructor/classrooms/${course._id}`}
                  className="manage-btn"
                >
                  Manage Classroom
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard; 