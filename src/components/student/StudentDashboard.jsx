import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../config';
import './StudentDashboard.css';

const StudentDashboard = () => {
  const [departments, setDepartments] = useState([]);
  const [selectedDept, setSelectedDept] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await axios.get(`${config.apiUrl}/departments`);
      setDepartments(response.data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const fetchCourses = async () => {
    if (selectedDept && selectedBranch) {
      try {
        const response = await axios.get(`${config.apiUrl}/subjects/${selectedDept}/${selectedBranch}`);
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [selectedDept, selectedBranch]);

  return (
    <div className="dashboard-container">
      <h1>Virtual Labs Dashboard</h1>
      
      <div className="selection-container">
        <div className="select-group">
          <label>Select Department</label>
          <select 
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
          >
            <option value="">Choose Department</option>
            {departments.map(dept => (
              <option key={dept.code} value={dept.code}>{dept.name}</option>
            ))}
          </select>
        </div>

        <div className="select-group">
          <label>Select Branch</label>
          <select
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            disabled={!selectedDept}
          >
            <option value="">Choose Branch</option>
            {departments
              .find(dept => dept.code === selectedDept)
              ?.branches.map(branch => (
                <option key={branch.code} value={branch.code}>
                  {branch.name}
                </option>
              ))}
          </select>
        </div>
      </div>

      <div className="courses-grid">
        {courses.map(course => (
          <div key={course._id} className="course-card">
            <h3>{course.name}</h3>
            <p className="course-code">{course.courseCode}</p>
            <button 
              onClick={() => navigate(`/course/${course._id}`)}
              className="view-course-btn"
            >
              Access Lab
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentDashboard; 