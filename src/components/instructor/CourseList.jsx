import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from '../../config';
import './CourseList.css';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      // Simulated data - replace with actual API calls
      const mockCourses = [
        {
          id: 1,
          code: 'CG101',
          name: 'Computer Graphics',
          groups: ['CS1', 'CS2', 'CS3'],
          totalStudents: 120,
          experimentsCount: 8
        },
        {
          id: 2,
          code: 'CS201',
          name: 'Cyber Security',
          groups: ['ENC1', 'ENC2'],
          totalStudents: 80,
          experimentsCount: 6
        }
      ];

      setCourses(mockCourses);
      setLoading(false);
    } catch (err) {
      setError('Failed to load courses');
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading courses...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="course-list">
      <div className="course-header">
        <h1>My Courses</h1>
        <p>Manage your lab courses and experiments</p>
      </div>

      <div className="courses-grid">
        {courses.map(course => (
          <div key={course.id} className="course-card">
            <div className="course-info">
              <h2>{course.name}</h2>
              <p className="course-code">{course.code}</p>
              
              <div className="groups-list">
                {course.groups.map(group => (
                  <span key={group} className="group-tag">{group}</span>
                ))}
              </div>
            </div>

            <div className="course-stats">
              <div className="stat">
                <span>Students</span>
                <p>{course.totalStudents}</p>
              </div>
              <div className="stat">
                <span>Experiments</span>
                <p>{course.experimentsCount}</p>
              </div>
            </div>

            <div className="course-actions">
              <Link 
                to={`/instructor/courses/${course.id}/experiments`}
                className="action-btn primary"
              >
                View Experiments
              </Link>
              <Link 
                to={`/instructor/courses/${course.id}/students`}
                className="action-btn secondary"
              >
                Manage Students
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList; 