import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import config from '../../config';
import './ClassroomView.css';

const ClassroomView = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [experiments, setExperiments] = useState([]);
  const [progress, setProgress] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchClassroomData = async () => {
      try {
        const [courseRes, experimentsRes, progressRes] = await Promise.all([
          axios.get(`${config.apiUrl}/student/courses/${courseId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          }),
          axios.get(`${config.apiUrl}/student/courses/${courseId}/experiments`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          }),
          axios.get(`${config.apiUrl}/student/courses/${courseId}/progress`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          })
        ]);

        setCourse(courseRes.data);
        setExperiments(experimentsRes.data);
        setProgress(progressRes.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to load classroom data');
        setLoading(false);
      }
    };

    fetchClassroomData();
  }, [courseId]);

  if (loading) return <div className="loading">Loading classroom...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!course) return <div className="error">Course not found</div>;

  return (
    <div className="classroom-view">
      <div className="classroom-header">
        <div className="course-info">
          <h1>{course.name}</h1>
          <p className="course-code">{course.courseCode}</p>
        </div>
        <div className="course-progress">
          <div className="progress-circle">
            <span className="progress-percentage">{progress.overall}%</span>
            <span className="progress-label">Complete</span>
          </div>
        </div>
      </div>

      <div className="classroom-content">
        <section className="course-details">
          <h2>Course Overview</h2>
          <div className="details-grid">
            <div className="detail-item">
              <span>Department</span>
              <p>{course.department}</p>
            </div>
            <div className="detail-item">
              <span>Instructor</span>
              <p>{course.instructor}</p>
            </div>
            <div className="detail-item">
              <span>Schedule</span>
              <p>{course.schedule}</p>
            </div>
          </div>
        </section>

        <section className="experiments-section">
          <h2>Lab Experiments</h2>
          <div className="experiments-grid">
            {experiments.map(experiment => (
              <div 
                key={experiment._id} 
                className={`experiment-card ${progress[experiment._id]?.completed ? 'completed' : ''}`}
              >
                <div className="experiment-header">
                  <h3>{experiment.title}</h3>
                  {progress[experiment._id]?.completed && (
                    <span className="completion-badge">Completed</span>
                  )}
                </div>
                <p className="experiment-description">{experiment.objective}</p>
                <div className="experiment-footer">
                  <span className="duration">Duration: {experiment.duration}</span>
                  <Link 
                    to={`/student/experiment/${experiment._id}`}
                    className="start-btn"
                  >
                    {progress[experiment._id]?.started ? 'Continue' : 'Start'}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ClassroomView; 