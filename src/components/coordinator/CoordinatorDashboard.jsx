import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from '../../config';
import './CoordinatorDashboard.css';

const CoordinatorDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalInstructors: 0,
    totalStudents: 0,
    activeExperiments: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [coursesRes, statsRes] = await Promise.all([
        axios.get(`${config.apiUrl}/coordinator/courses`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }),
        axios.get(`${config.apiUrl}/coordinator/stats`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
      ]);

      setCourses(coursesRes.data.courses);
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
    <div className="coordinator-dashboard">
      <div className="dashboard-header">
        <h1>Course Coordinator Dashboard</h1>
        <Link to="/coordinator/courses/new" className="add-course-btn">
          Add New Course
        </Link>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Courses</h3>
          <p>{stats.totalCourses}</p>
        </div>
        <div className="stat-card">
          <h3>Lab Instructors</h3>
          <p>{stats.totalInstructors}</p>
        </div>
        <div className="stat-card">
          <h3>Enrolled Students</h3>
          <p>{stats.totalStudents}</p>
        </div>
        <div className="stat-card">
          <h3>Active Experiments</h3>
          <p>{stats.activeExperiments}</p>
        </div>
      </div>

      <div className="dashboard-section">
        <h2>Your Courses</h2>
        <div className="courses-grid">
          {courses.map(course => (
            <div key={course._id} className="course-card">
              <div className="course-header">
                <h3>{course.name}</h3>
                <span className="course-code">{course.courseCode}</span>
              </div>
              <div className="course-stats">
                <div>
                  <span>Instructors</span>
                  <p>{course.instructorsCount}</p>
                </div>
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
                <Link to={`/coordinator/courses/${course._id}`} className="view-btn">
                  View Details
                </Link>
                <Link to={`/coordinator/courses/${course._id}/instructors`} className="manage-btn">
                  Manage Instructors
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="dashboard-section">
        <h2>Recent Activities</h2>
        <div className="activities-list">
          {/* Add recent activities component here */}
        </div>
      </div>
    </div>
  );
};

export default CoordinatorDashboard; 