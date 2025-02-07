import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../../config';
import './CourseManagement.css';

const CourseManagement = () => {
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState({
    name: '',
    courseCode: '',
    department: '',
    introduction: '',
    objective: '',
    targetAudience: '',
    referenceBooks: '',
    prerequisites: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await axios.post(`${config.apiUrl}/coordinator/courses`, courseData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      
      navigate('/coordinator/courses');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create course');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="course-management">
      <div className="management-header">
        <h1>Add New Course</h1>
      </div>

      <form onSubmit={handleSubmit} className="course-form">
        <div className="form-grid">
          <div className="form-group">
            <label>Course Name</label>
            <input
              type="text"
              value={courseData.name}
              onChange={(e) => setCourseData({...courseData, name: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label>Course Code</label>
            <input
              type="text"
              value={courseData.courseCode}
              onChange={(e) => setCourseData({...courseData, courseCode: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label>Department</label>
            <select
              value={courseData.department}
              onChange={(e) => setCourseData({...courseData, department: e.target.value})}
              required
            >
              <option value="">Select Department</option>
              <option value="CSED">Computer Science Engineering</option>
              <option value="ECED">Electronics & Communication</option>
              {/* Add other departments */}
            </select>
          </div>

          <div className="form-group">
            <label>Target Audience</label>
            <select
              value={courseData.targetAudience}
              onChange={(e) => setCourseData({...courseData, targetAudience: e.target.value})}
              required
            >
              <option value="">Select Year</option>
              <option value="1">1st Year</option>
              <option value="2">2nd Year</option>
              <option value="3">3rd Year</option>
              <option value="4">4th Year</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Introduction</label>
          <textarea
            value={courseData.introduction}
            onChange={(e) => setCourseData({...courseData, introduction: e.target.value})}
            required
            rows={4}
          />
        </div>

        <div className="form-group">
          <label>Course Objectives</label>
          <textarea
            value={courseData.objective}
            onChange={(e) => setCourseData({...courseData, objective: e.target.value})}
            required
            rows={4}
          />
        </div>

        <div className="form-group">
          <label>Prerequisites</label>
          <textarea
            value={courseData.prerequisites}
            onChange={(e) => setCourseData({...courseData, prerequisites: e.target.value})}
            rows={3}
          />
        </div>

        <div className="form-group">
          <label>Reference Books</label>
          <textarea
            value={courseData.referenceBooks}
            onChange={(e) => setCourseData({...courseData, referenceBooks: e.target.value})}
            required
            rows={3}
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="form-actions">
          <button 
            type="button" 
            className="cancel-btn"
            onClick={() => navigate('/coordinator')}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="submit-btn"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Course'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CourseManagement; 