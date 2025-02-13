import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import config from '../../config';
import './ClassroomManager.css';

const ClassroomManager = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [students, setStudents] = useState([]);
  const [experiments, setExperiments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchClassroomData();
  }, [courseId]);

  const fetchClassroomData = async () => {
    try {
      const [courseRes, studentsRes, experimentsRes] = await Promise.all([
        axios.get(`${config.apiUrl}/instructor/courses/${courseId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }),
        axios.get(`${config.apiUrl}/instructor/courses/${courseId}/students`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }),
        axios.get(`${config.apiUrl}/instructor/courses/${courseId}/experiments`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
      ]);

      setCourse(courseRes.data);
      setStudents(studentsRes.data);
      setExperiments(experimentsRes.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load classroom data');
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading classroom...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!course) return <div className="error">Course not found</div>;

  return (
    <div className="classroom-manager">
      <div className="manager-header">
        <h1>{course.name} Classroom</h1>
        <p className="course-code">{course.courseCode}</p>
      </div>

      <div className="classroom-grid">
        <div className="students-section">
          <div className="section-header">
            <h2>Students</h2>
            <Link 
              to={`/instructor/attendance/${courseId}`}
              className="attendance-btn"
            >
              Take Attendance
            </Link>
          </div>
          <div className="students-list">
            {students.map(student => (
              <div key={student._id} className="student-card">
                <div className="student-info">
                  <h3>{student.name}</h3>
                  <p>{student.rollNumber}</p>
                </div>
                <div className="student-stats">
                  <span>Attendance: {student.attendance}%</span>
                  <span>Progress: {student.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="experiments-section">
          <h2>Experiments</h2>
          <div className="experiments-list">
            {experiments.map(experiment => (
              <div key={experiment._id} className="experiment-card">
                <h3>{experiment.title}</h3>
                <div className="experiment-actions">
                  <Link 
                    to={`/instructor/evaluation/${courseId}/${experiment._id}`}
                    className="evaluate-btn"
                  >
                    Evaluate Submissions
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassroomManager; 