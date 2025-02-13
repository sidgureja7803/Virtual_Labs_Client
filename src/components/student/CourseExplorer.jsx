import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../../config';
import './CourseExplorer.css';

const CourseExplorer = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    department: '',
    semester: '',
    search: ''
  });

  useEffect(() => {
    fetchCourses();
  }, [filters.department, filters.semester]);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(`${config.apiUrl}/student/courses`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        params: filters
      });
      setCourses(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load courses');
      setLoading(false);
    }
  };

  const handleEnroll = async (courseId) => {
    try {
      await axios.post(
        `${config.apiUrl}/student/courses/${courseId}/enroll`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }
      );
      navigate(`/student/classroom/${courseId}`);
    } catch (err) {
      setError('Failed to enroll in course');
    }
  };

  if (loading) return <div className="loading">Loading courses...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="course-explorer">
      <div className="explorer-header">
        <h1>Explore Lab Courses</h1>
      </div>

      <div className="filters-section">
        <input
          type="text"
          placeholder="Search courses..."
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          className="search-input"
        />

        <select
          value={filters.department}
          onChange={(e) => setFilters({ ...filters, department: e.target.value })}
        >
          <option value="">All Departments</option>
          <option value="CSED">Computer Science</option>
          <option value="ECED">Electronics & Communication</option>
          <option value="MECH">Mechanical Engineering</option>
          {/* Add more departments */}
        </select>

        <select
          value={filters.semester}
          onChange={(e) => setFilters({ ...filters, semester: e.target.value })}
        >
          <option value="">All Semesters</option>
          <option value="1">1st Semester</option>
          <option value="2">2nd Semester</option>
          {/* Add more semesters */}
        </select>
      </div>

      <div className="courses-grid">
        {courses.map(course => (
          <div key={course._id} className="course-card">
            <h3>{course.name}</h3>
            <p className="course-code">{course.courseCode}</p>
            <div className="course-details">
              <p>{course.department}</p>
              <p>Semester {course.semester}</p>
            </div>
            <p className="course-description">{course.introduction}</p>
            <button
              onClick={() => handleEnroll(course._id)}
              className="enroll-btn"
            >
              Enroll Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseExplorer; 