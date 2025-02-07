import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../../config';
import './ManageInstructors.css';

const ManageInstructors = () => {
  const [courses, setCourses] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedInstructor, setSelectedInstructor] = useState('');
  const [subgroups, setSubgroups] = useState([]);
  const [selectedSubgroups, setSelectedSubgroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      const [coursesRes, instructorsRes] = await Promise.all([
        axios.get(`${config.apiUrl}/coordinator/courses`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }),
        axios.get(`${config.apiUrl}/coordinator/instructors`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
      ]);

      setCourses(coursesRes.data.courses);
      setInstructors(instructorsRes.data.instructors);
      setLoading(false);
    } catch (error) {
      setError('Failed to load data');
      setLoading(false);
    }
  };

  const handleCourseChange = async (courseId) => {
    setSelectedCourse(courseId);
    try {
      const response = await axios.get(`${config.apiUrl}/coordinator/courses/${courseId}/subgroups`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setSubgroups(response.data.subgroups);
    } catch (error) {
      setError('Failed to load subgroups');
    }
  };

  const handleSubgroupToggle = (subgroupId) => {
    setSelectedSubgroups(prev => {
      if (prev.includes(subgroupId)) {
        return prev.filter(id => id !== subgroupId);
      }
      return [...prev, subgroupId];
    });
  };

  const handleRemoveAssignment = async (assignmentId) => {
    try {
      await axios.delete(`${config.apiUrl}/coordinator/assignments/${assignmentId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      fetchInitialData();
    } catch (error) {
      setError('Failed to remove assignment');
    }
  };

  const handleAssignInstructor = async () => {
    if (!selectedCourse || !selectedInstructor || selectedSubgroups.length === 0) {
      setError('Please select course, instructor and at least one subgroup');
      return;
    }

    try {
      await axios.post(
        `${config.apiUrl}/coordinator/assign-instructor`,
        {
          courseId: selectedCourse,
          instructorId: selectedInstructor,
          subgroups: selectedSubgroups
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }
      );

      // Reset selections
      setSelectedSubgroups([]);
      setSelectedInstructor('');
      
      // Refresh data
      fetchInitialData();
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to assign instructor');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="manage-instructors">
      <div className="management-header">
        <h1>Manage Lab Instructors</h1>
      </div>

      <div className="instructor-management-grid">
        <div className="assignment-section">
          <h2>Assign Instructors</h2>
          
          <div className="form-group">
            <label>Select Course</label>
            <select
              value={selectedCourse}
              onChange={(e) => handleCourseChange(e.target.value)}
            >
              <option value="">Choose Course</option>
              {courses.map(course => (
                <option key={course._id} value={course._id}>
                  {course.name} ({course.courseCode})
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Select Instructor</label>
            <select
              value={selectedInstructor}
              onChange={(e) => setSelectedInstructor(e.target.value)}
            >
              <option value="">Choose Instructor</option>
              {instructors.map(instructor => (
                <option key={instructor._id} value={instructor._id}>
                  {instructor.name} ({instructor.employeeId})
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Select Subgroups</label>
            <div className="subgroups-grid">
              {subgroups.map(subgroup => (
                <label key={subgroup._id} className="subgroup-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedSubgroups.includes(subgroup._id)}
                    onChange={() => handleSubgroupToggle(subgroup._id)}
                  />
                  {subgroup.name}
                </label>
              ))}
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button 
            className="assign-btn"
            onClick={handleAssignInstructor}
            disabled={!selectedCourse || !selectedInstructor || selectedSubgroups.length === 0}
          >
            Assign Instructor
          </button>
        </div>

        <div className="current-assignments">
          <h2>Current Assignments</h2>
          {courses.map(course => (
            <div key={course._id} className="course-assignments">
              <h3>{course.name}</h3>
              <div className="assignments-list">
                {course.instructorAssignments?.map(assignment => (
                  <div key={assignment._id} className="assignment-card">
                    <div className="instructor-info">
                      <span className="instructor-name">{assignment.instructor.name}</span>
                      <span className="instructor-id">({assignment.instructor.employeeId})</span>
                    </div>
                    <div className="assigned-groups">
                      {assignment.subgroups.map(subgroup => (
                        <span key={subgroup._id} className="subgroup-tag">
                          {subgroup.name}
                        </span>
                      ))}
                    </div>
                    <button 
                      className="remove-btn"
                      onClick={() => handleRemoveAssignment(assignment._id)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageInstructors; 