import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';
import '../styles/Dashboard.css';

const TeacherDashboard = () => {
  const [departments, setDepartments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    department: '',
    branch: '',
    courseCode: '',
    name: '',
    introduction: '',
    objective: '',
    experiments: [],
    targetAudience: '',
    referenceBooks: '',
    feedback: ''
  });

  useEffect(() => {
    fetchDepartments();
    fetchTeacherCourses();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await axios.get(`${config.apiUrl}/departments`);
      setDepartments(response.data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const fetchTeacherCourses = async () => {
    try {
      const response = await axios.get(`${config.apiUrl}/subjects/teacher`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${config.apiUrl}/subjects`, formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      fetchTeacherCourses();
      setShowAddForm(false);
      setFormData({
        department: '',
        branch: '',
        courseCode: '',
        name: '',
        introduction: '',
        objective: '',
        experiments: [],
        targetAudience: '',
        referenceBooks: '',
        feedback: ''
      });
    } catch (error) {
      console.error('Error adding course:', error);
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Teacher Dashboard</h1>
      
      <div className="dashboard-actions">
        <button 
          className="add-course-btn"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? 'Cancel' : 'Add New Course'}
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleSubmit} className="course-form">
          <div className="form-group">
            <label>Department</label>
            <select
              value={formData.department}
              onChange={(e) => setFormData({...formData, department: e.target.value})}
              required
            >
              <option value="">Select Department</option>
              {departments.map(dept => (
                <option key={dept.code} value={dept.code}>{dept.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Branch</label>
            <select
              value={formData.branch}
              onChange={(e) => setFormData({...formData, branch: e.target.value})}
              required
              disabled={!formData.department}
            >
              <option value="">Select Branch</option>
              {departments
                .find(dept => dept.code === formData.department)
                ?.branches.map(branch => (
                  <option key={branch.code} value={branch.code}>
                    {branch.name}
                  </option>
                ))}
            </select>
          </div>

          <div className="form-group">
            <label>Course Code</label>
            <input
              type="text"
              value={formData.courseCode}
              onChange={(e) => setFormData({...formData, courseCode: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label>Course Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label>Introduction</label>
            <textarea
              value={formData.introduction}
              onChange={(e) => setFormData({...formData, introduction: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label>Objective</label>
            <textarea
              value={formData.objective}
              onChange={(e) => setFormData({...formData, objective: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label>Target Audience</label>
            <select
              value={formData.targetAudience}
              onChange={(e) => setFormData({...formData, targetAudience: e.target.value})}
              required
            >
              <option value="">Select Year</option>
              <option value="1">1st Year</option>
              <option value="2">2nd Year</option>
              <option value="3">3rd Year</option>
              <option value="4">4th Year</option>
            </select>
          </div>

          <div className="form-group">
            <label>Reference Books</label>
            <textarea
              value={formData.referenceBooks}
              onChange={(e) => setFormData({...formData, referenceBooks: e.target.value})}
              required
            />
          </div>

          <button type="submit" className="submit-button">Add Course</button>
        </form>
      )}

      <div className="courses-grid">
        {courses.map(course => (
          <div key={course._id} className="course-card">
            <h3>{course.name}</h3>
            <p className="course-code">{course.courseCode}</p>
            <p className="course-dept">{course.department} - {course.branch}</p>
            <div className="course-actions">
              <button 
                onClick={() => navigate(`/course/${course._id}/edit`)}
                className="edit-btn"
              >
                Edit Course
              </button>
              <button 
                onClick={() => navigate(`/course/${course._id}/experiments`)}
                className="experiments-btn"
              >
                Manage Experiments
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeacherDashboard; 