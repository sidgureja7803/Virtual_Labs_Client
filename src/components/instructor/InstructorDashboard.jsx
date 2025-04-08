import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import config from '../../config';
import './InstructorDashboard.css';

const InstructorDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [stats, setStats] = useState({
    totalGroups: 10,
    activeAssignments: 5,
    upcomingQuizzes: 3,
    students: 240
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [weeklySubmissions, setWeeklySubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Simulated data - replace with actual API calls
      const mockWeeklyData = [
        { date: 'Aug 01', submissions: 100 },
        { date: 'Aug 10', submissions: 80 },
        { date: 'Aug 20', submissions: 120 },
        { date: 'Aug 31', submissions: 90 }
      ];

      const mockActivity = [
        {
          id: 1,
          type: 'submission',
          message: 'John Doe submitted Assignment 3',
          time: 'Just now'
        },
        {
          id: 2,
          type: 'quiz',
          message: 'Upcoming Quiz on March 22, 11:59 PM',
          time: '5 mins ago'
        },
        {
          id: 3,
          type: 'announcement',
          message: 'Reminder: Lab submissions close tonight!',
          time: '2 hours ago'
        }
      ];

      setWeeklySubmissions(mockWeeklyData);
      setRecentActivity(mockActivity);
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
        <h1>Welcome!</h1>
        <p>Dr. Manish</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon groups">📚</div>
          <div className="stat-info">
            <h3>Total Groups</h3>
            <p>{stats.totalGroups}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon assignments">📝</div>
          <div className="stat-info">
            <h3>Active Assignments</h3>
            <p>{stats.activeAssignments}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon quizzes">❓</div>
          <div className="stat-info">
            <h3>Upcoming Quizzes</h3>
            <p>{stats.upcomingQuizzes}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon students">👥</div>
          <div className="stat-info">
            <h3>Students</h3>
            <p>{stats.students}</p>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="content-left">
          <div className="chart-section">
            <h2>Weekly Assignment Submissions</h2>
            <LineChart width={600} height={300} data={weeklySubmissions}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="submissions" stroke="#cc0000" />
            </LineChart>
          </div>
        </div>

        <div className="content-right">
          <div className="recent-activity">
            <h2>Recent Activity</h2>
            <div className="activity-list">
              {recentActivity.map(activity => (
                <div key={activity.id} className="activity-item">
                  <div className={`activity-icon ${activity.type}`}>
                    {activity.type === 'submission' && '📥'}
                    {activity.type === 'quiz' && '📝'}
                    {activity.type === 'announcement' && '📢'}
                  </div>
                  <div className="activity-content">
                    <p>{activity.message}</p>
                    <span className="activity-time">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="quick-actions">
        <Link to="/instructor/lab-evaluation" className="action-button">
          Evaluate Labs
        </Link>
        <Link to="/instructor/attendance" className="action-button">
          Track Attendance
        </Link>
        <Link to="/instructor/quizzes" className="action-button">
          Manage Quizzes
        </Link>
      </div>
    </div>
  );
};

export default InstructorDashboard; 